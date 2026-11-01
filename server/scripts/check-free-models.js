/**
 * Checks which OpenRouter `:free` models are actually usable right now.
 *
 * Model IDs on OpenRouter come and go. Every model the app ships must (a) still
 * exist in the catalog and (b) return real text instead of a rate-limit error or
 * a null `content` field, otherwise a user's generate click just fails.
 *
 * Usage:
 *   node scripts/check-free-models.js            # catalog + live probe
 *   node scripts/check-free-models.js --catalog  # catalog only, no tokens spent
 *
 * Writes a report to scripts/free-models-report.json.
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const BASE = "https://openrouter.ai/api/v1";
const KEY = process.env.OPENROUTER_API_KEY;
const TIMEOUT_MS = 120000;
const DELAY_MS = 6000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchCatalog() {
  const res = await fetch(`${BASE}/models`);
  if (!res.ok) throw new Error(`Catalog request failed: ${res.status}`);
  const { data } = await res.json();

  return data
    .filter((model) => model.id.endsWith(":free"))
    .filter((model) => (model.architecture?.output_modalities || []).includes("text"))
    .map((model) => ({
      id: model.id,
      name: model.name,
      context: model.context_length,
      input: model.architecture?.input_modalities || [],
      supportsStructured: (model.supported_parameters || []).includes("response_format"),
    }));
}

async function probe(modelId) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: "user",
            content:
              "Repurpose this for LinkedIn in a professional tone, 2 sentences: " +
              "We have been fully distributed for three years and async communication is why it works.",
          },
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      return { status: res.status, ok: false, error: text.slice(0, 200) };
    }

    const json = JSON.parse(text);
    const content = json.choices?.[0]?.message?.content;
    return {
      status: res.status,
      ok: Boolean(content && content.trim()),
      finish: json.choices?.[0]?.finish_reason,
      chars: content ? content.length : 0,
      sample: content ? content.replace(/\s+/g, " ").slice(0, 160) : null,
    };
  } catch (error) {
    return { ok: false, error: error.name === "AbortError" ? "timeout" : error.message };
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  if (!KEY) throw new Error("OPENROUTER_API_KEY is missing from server/.env");

  const catalogOnly = process.argv.includes("--catalog");
  const catalog = await fetchCatalog();

  // options.js is an ES module, so read the shipped IDs as text instead of requiring it.
  const optionsPath = path.join(__dirname, "..", "..", "client", "src", "data", "options.js");
  const optionsSource = fs.readFileSync(optionsPath, "utf8");
  const shippedIds = [...optionsSource.matchAll(/value:\s*"([^"]+:[^"]+)"/g)].map((match) => match[1]);

  console.log(`Free text models in catalog: ${catalog.length}`);

  const catalogIds = new Set(catalog.map((model) => model.id));
  const deadInApp = shippedIds.filter((id) => !catalogIds.has(id));

  const results = [];
  for (const model of catalog) {
    if (catalogOnly) {
      results.push({ ...model, probed: false });
      continue;
    }

    const result = await probe(model.id);
    results.push({ ...model, probed: true, ...result });
    console.log(
      `${result.ok ? "PASS" : "FAIL"} ${model.id}${result.ok ? ` (${result.chars} chars)` : ` — ${result.error || result.status}`}`
    );
    await sleep(DELAY_MS);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    catalogCount: catalog.length,
    usable: results.filter((r) => r.ok).map((r) => r.id),
    broken: results.filter((r) => r.probed && !r.ok).map((r) => ({ id: r.id, error: r.error, status: r.status })),
    missingFromApp: deadInApp,
    results,
  };

  const outPath = path.join(__dirname, "free-models-report.json");
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  if (deadInApp.length) {
    console.log(`\n${deadInApp.length} model(s) shipped by the app no longer exist on OpenRouter:`);
    deadInApp.forEach((id) => console.log(`  - ${id}`));
  }

  console.log(`\nUsable: ${report.usable.length}/${catalog.length}`);
  console.log(`Report: ${outPath}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

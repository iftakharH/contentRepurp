import { DEFAULT_MODEL, models } from "./options";

describe("model catalog", () => {
  // The server silently falls back to the default model when a requested model
  // does not end in `:free`, so a typo here would cost the user their pick
  // without any error. Lock the invariant down instead.
  it("only ships models that end in :free", () => {
    models.forEach((model) => {
      expect(model.value).toMatch(/:free$/);
    });
  });

  it("has no duplicate model IDs", () => {
    const ids = models.map((model) => model.value);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("defaults to a model that is actually in the list", () => {
    expect(models.map((model) => model.value)).toContain(DEFAULT_MODEL);
  });
});

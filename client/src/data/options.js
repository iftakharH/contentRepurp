import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";

export const platforms = [
  { value: "twitter", label: "X / Twitter", icon: FaXTwitter },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { value: "instagram", label: "Instagram", icon: FaInstagram },
  { value: "blog", label: "Blog post", icon: HiOutlineDocumentText },
  { value: "email", label: "Email", icon: FaEnvelope },
  { value: "facebook", label: "Facebook", icon: FaFacebookF },
];

export const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "formal", label: "Formal" },
  { value: "inspirational", label: "Inspirational" },
];

// Every model here must end in `:free` — anything else costs the user money.
// OpenRouter retires free models often. Re-verify with:
//   cd server && node scripts/check-free-models.js
// Only ship models that script reports as PASS, or generation breaks.
export const models = [
  {
    value: "nvidia/nemotron-3-ultra-550b-a55b:free",
    label: "Nemotron 3 Ultra",
    provider: "Nvidia",
  },
  {
    value: "nvidia/nemotron-3.5-super-vl:free",
    label: "Nemotron 3.5 Super VL",
    provider: "Nvidia",
  },
  {
    value: "dots-studio/dots-3-note-preview:free",
    label: "Dots3 Note",
    provider: "Dots Studio",
  },
  {
    value: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    label: "Nemotron 3 Nano Omni",
    provider: "Nvidia",
  },
  {
    value: "cohere/north-mini-code:free",
    label: "North Mini Code",
    provider: "Cohere",
  },
];

export const DEFAULT_MODEL = models[0].value;

export const getPlatform = (value) =>
  platforms.find((platform) => platform.value === value) || {
    value,
    label: value,
    icon: HiOutlineDocumentText,
  };

export const getTone = (value) =>
  tones.find((tone) => tone.value === value) || { value, label: value };

export const getModelLabel = (value) => {
  if (!value) return null;
  const match = models.find((model) => model.value === value);
  if (match) return match.label;
  return value.split("/").pop().replace(":free", "");
};

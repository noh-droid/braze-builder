import { defaultConfig, normalizeFigmaConfig } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-modal",
  label: "Figma Basic 1:1",
  description: "339×339 이미지 + 하단 339px 버튼 행 (Figma Basic 1:1)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaConfig,
};

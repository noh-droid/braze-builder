import { defaultConfig, normalizeFigmaSlide11Config } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-slide-11",
  label: "Figma Slide 1:1",
  description: "최대 6장 캐러셀 + 1/N 인디케이터 (Slide_Modal_1:1)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaSlide11Config,
};

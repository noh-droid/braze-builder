import { defaultConfig, normalizeFigmaSlideVConfig } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-slide-vertical",
  label: "Figma Slide 세로",
  description: "세로 슬라이드 스트립 + 텍스트 + CTA (Slide_Modal_Vertical)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaSlideVConfig,
};

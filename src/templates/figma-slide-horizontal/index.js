import { defaultConfig, normalizeFigmaSlideHConfig } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-slide-horizontal",
  label: "Figma Slide 가로",
  description: "낮은 슬라이드 스트립 + 텍스트 + CTA (Slide_Modal_Horizontal)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaSlideHConfig,
};

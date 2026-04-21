import { defaultConfig, normalizeFigmaAlarmConfig } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-alarm",
  label: "Figma Alarm",
  description: "아이콘 + 텍스트 + CTA (Alarm_Modal)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaAlarmConfig,
};

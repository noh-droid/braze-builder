import { defaultConfig, normalizeFigmaModal35Config } from "./defaultConfig";
import { generateCode } from "./generateCode";
import Preview from "./Preview";
import Settings from "./Settings";

export default {
  id: "figma-modal-35",
  label: "Figma Basic 3:5",
  description: "세로 3:5 이미지 + 버튼 오버레이 (Basic_Modal_3:5)",
  defaultConfig,
  generateCode,
  Preview,
  Settings,
  normalizeConfig: normalizeFigmaModal35Config,
};

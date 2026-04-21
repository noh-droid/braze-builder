import {
  ModalPreviewBackdrop,
  ModalPreviewDevice,
  ModalPreviewNotch,
  ModalPreviewScreen,
  ModalPreviewSheet,
} from "../../components/modal-layout/ModalPreviewFrame.jsx";
import {
  modalPreviewBottomFootLeftStyle,
  modalPreviewBottomFootRightStyle,
  modalPreviewBottomFootRowStyle,
} from "../../components/modal-layout/modalPreviewFootnoteStyles.js";
import { scaleDesignPx } from "../../constants/modalViewport.js";

const s = scaleDesignPx;

export default function FigmaAlarmPreview({ config }) {
  const cw = config.cardWidth ?? 299;
  const cardW = Math.min(s(cw), 339);
  const iconSz = s(config.iconSize ?? 70);
  const padX = s(config.cardPaddingX ?? 20);
  const padT = s(config.cardPaddingTop ?? 26);
  const padB = s(config.cardPaddingBottom ?? 20);
  const iconGap = s(config.iconGap ?? 16);
  const tg = s(config.textBlockGap ?? 7);
  const titleSz = Math.max(s(12), s(config.titleSize ?? 20));
  const subSz = Math.max(s(10), s(config.subtitleSize ?? 13));
  const btnH = s(config.btnHeight ?? 46);
  const btnR = s(config.btnRadius ?? 4);
  const btnFs = Math.max(11, s(config.btnSize ?? 15));

  return (
    <ModalPreviewDevice>
      <ModalPreviewNotch />
      <ModalPreviewScreen bgOpacity={config.bgOpacity}>
        <ModalPreviewBackdrop opacity={1 - config.bgOpacity / 100} />
        <ModalPreviewSheet>
          <div
            style={{
              width: `${cardW}px`,
              maxWidth: "100%",
              zIndex: 2,
              background: config.cardBg ?? "#fff",
              borderRadius: `${s(14)}px`,
              overflow: "hidden",
              padding: `${padT}px ${padX}px ${padB}px`,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: `${iconGap}px`,
              }}
            >
              <div
                style={{
                  width: `${iconSz}px`,
                  height: `${iconSz}px`,
                  flexShrink: 0,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={config.iconUrl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/70x70/e2e8f0/64748b?text=icon";
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${tg}px`,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: `${config.titleFont ?? "Inter"}, sans-serif`,
                    fontWeight: "700",
                    fontSize: `${titleSz}px`,
                    lineHeight: 1.25,
                    color: config.titleColor ?? "#000",
                  }}
                >
                  {config.titleText}
                </div>
                <div
                  style={{
                    fontFamily: `${config.subtitleFont ?? "Inter"}, sans-serif`,
                    fontWeight: "400",
                    fontSize: `${subSz}px`,
                    lineHeight: 1.45,
                    color: config.subtitleColor ?? "#000",
                  }}
                >
                  {config.subtitleText}
                </div>
              </div>
              <div
                style={{
                  marginTop: `${s(4)}px`,
                  width: `calc(100% + ${padX * 2}px)`,
                  marginLeft: `-${padX}px`,
                  marginRight: `-${padX}px`,
                  height: `${btnH}px`,
                  borderRadius: `${btnR}px`,
                  background: config.btnBgColor ?? "#00dc64",
                  color: config.btnColor ?? "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: config.btnWeight ?? "700",
                  fontSize: `${btnFs}px`,
                  fontFamily: `${config.btnFont ?? "Inter"}, sans-serif`,
                }}
              >
                {config.btnText}
              </div>
            </div>

            <div style={modalPreviewBottomFootRowStyle}>
              <span
                style={modalPreviewBottomFootLeftStyle(
                  config.bottomColor,
                  "Inter, sans-serif",
                )}
              >
                {config.bottomLeftText}
              </span>
              <span
                style={modalPreviewBottomFootRightStyle(
                  config.bottomColor,
                  "Inter, sans-serif",
                )}
              >
                {config.bottomRightText} ✕
              </span>
            </div>
          </div>
        </ModalPreviewSheet>
      </ModalPreviewScreen>
    </ModalPreviewDevice>
  );
}

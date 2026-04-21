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

export default function FigmaModal35Preview({ config }) {
  const aw = config.imageAspectW ?? 339;
  const ah = config.imageAspectH ?? 582;
  const btnH = config.btnHeight ?? 46;
  const btnGap = s(config.btnGap ?? 9);
  const side = s(config.btnOverlaySideMargin ?? 20);
  const bottomOff = s(config.btnOverlayBottom ?? 20);
  const radius = s(config.imageRadius ?? 14);
  const br = config.btnRadius ?? 4;
  const btnFs = Math.max(11, Number(config.btnSize ?? 15));

  return (
    <ModalPreviewDevice>
      <ModalPreviewNotch />
      <ModalPreviewScreen bgOpacity={config.bgOpacity}>
        <ModalPreviewBackdrop opacity={1 - config.bgOpacity / 100} />
        <ModalPreviewSheet>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: `${aw} / ${ah}`,
                borderRadius: `${radius}px`,
                overflow: "hidden",
                background: "#0f172a",
              }}
            >
              <img
                src={config.imageUrl}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x1000/e2e8f0/94a3b8?text=3:5";
                }}
              />
              {(config.buttonCount ?? 2) !== 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: `${side}px`,
                    right: `${side}px`,
                    bottom: `${bottomOff}px`,
                    display: "flex",
                    gap: `${btnGap}px`,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: `${btnH}px`,
                      borderRadius: `${br}px`,
                      background: config.btnBgColor,
                      color: config.btnColor,
                      fontSize: `${btnFs}px`,
                      fontWeight: config.btnWeight,
                      fontFamily: `${config.btnFont}, sans-serif`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {config.btnText}
                  </div>
                  {(config.buttonCount ?? 2) === 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: `${btnH}px`,
                        borderRadius: `${br}px`,
                        background: config.btn2BgColor ?? config.btnBgColor,
                        color: config.btn2Color ?? config.btnColor,
                        fontSize: `${btnFs}px`,
                        fontWeight: config.btnWeight,
                        fontFamily: `${config.btnFont}, sans-serif`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      {config.btnText2}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={modalPreviewBottomFootRowStyle}>
              <span
                style={modalPreviewBottomFootLeftStyle(
                  config.bottomColor,
                  "Pretendard, sans-serif",
                )}
              >
                {config.bottomLeftText}
              </span>
              <span
                style={modalPreviewBottomFootRightStyle(
                  config.bottomColor,
                  "Pretendard, sans-serif",
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

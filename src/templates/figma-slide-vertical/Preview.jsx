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
import { collectSlideImageUrls } from "../figma-shared/slideImageKeys.js";
import { useSlideStripCarousel } from "../figma-shared/useSlideStripCarousel.js";

const s = scaleDesignPx;

const PLACEHOLDER = "https://placehold.co/270x348/e2e8f0/94a3b8?text=Slide";

export default function FigmaSlideVerticalPreview({ config }) {
  const cw = config.cardWidth ?? 310;
  const sw = config.slideImageWidth ?? 270;
  const sh = config.slideImageHeight ?? 348;
  const gap = config.slideGap ?? 10;
  const cardW = Math.min(s(cw), 339);
  const sW = s(sw);
  const sH = s(sh);
  const g = s(gap);
  const padT = s(config.cardPaddingTop ?? 14);
  const padX = s(config.cardPaddingX ?? 20);
  const padB = s(config.cardPaddingBottom ?? 20);
  const slideR = s(config.slideRadius ?? 4);
  const rawUrls = collectSlideImageUrls(config, { max: 3 });
  const urls = rawUrls.length > 0 ? rawUrls : [PLACEHOLDER];
  const n = urls.length;
  const btnH = s(config.btnHeight ?? 46);
  const btnR = s(config.btnRadius ?? 4);
  const btnFs = Math.max(11, s(config.btnSize ?? 15));
  const titleSz = Math.max(s(12), s(config.titleSize ?? 20));
  const subSz = Math.max(s(10), s(config.subtitleSize ?? 13));
  const btnPad = s(20);

  const { stripRef, index: i } = useSlideStripCarousel({
    slideCount: n,
    gapPx: g,
    autoPlay: config.slideAutoPlay ?? false,
    autoPlayMs: config.slideAutoPlayMs ?? 3000,
  });

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
            <div style={{ position: "relative", width: "100%" }}>
              <div
                style={{
                  width: `${sW}px`,
                  maxWidth: "100%",
                  margin: "0 auto",
                  height: `${sH}px`,
                  overflow: "hidden",
                  borderRadius: `${slideR}px`,
                  position: "relative",
                }}
              >
                <div
                  ref={stripRef}
                  className="modal-preview-slide-strip"
                  style={{
                    display: "flex",
                    gap: `${g}px`,
                    height: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {urls.map((u, k) => (
                    <img
                      key={k}
                      src={u}
                      alt=""
                      style={{
                        width: `${sW}px`,
                        height: `${sH}px`,
                        objectFit: "cover",
                        flexShrink: 0,
                        borderRadius: `${slideR}px`,
                        scrollSnapAlign: "start",
                      }}
                      onError={(e) => {
                        e.target.src = PLACEHOLDER;
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: s(6),
                    right: s(6),
                    background: config.pagerBg ?? "rgba(0,0,0,0.8)",
                    borderRadius: "100px",
                    padding: `${s(3)}px ${s(8)}px`,
                    fontSize: `${s(10)}px`,
                    fontFamily: "Arial, sans-serif",
                    color: "#fff",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ color: "#fff" }}>{Math.min(i + 1, n)}</span>
                  <span style={{ color: "#828282" }}> / </span>
                  <span style={{ color: "#828282" }}>{n}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: `${s(12)}px`,
                color: config.titleColor ?? "#000",
                fontWeight: "700",
                fontSize: `${titleSz}px`,
                lineHeight: 1.3,
                fontFamily: "Inter, Pretendard, sans-serif",
              }}
            >
              {config.titleText}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: `${s(6)}px`,
                color: config.subtitleColor ?? "#000",
                fontSize: `${subSz}px`,
                lineHeight: 1.45,
                fontFamily: "Inter, Pretendard, sans-serif",
              }}
            >
              {config.subtitleText}
            </div>

            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: `${btnPad}px`,
              }}
            >
              <div
                style={{
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
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {config.btnText}
              </div>
            </div>

            <div
              style={{
                ...modalPreviewBottomFootRowStyle,
                padding: `0 4px 10px 2px`,
                boxSizing: "border-box",
              }}
            >
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

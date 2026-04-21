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

const PLACEHOLDER = "https://placehold.co/600x600/e2e8f0/94a3b8?text=Slide";

export default function FigmaSlide11Preview({ config }) {
  const aw = config.imageAspectW ?? 339;
  const ah = config.imageAspectH ?? 342;
  const radius = s(config.imageRadius ?? 14);
  const pb = Math.max(s(4), s(6));
  const pr = Math.max(s(4), s(6));
  const pagerFs = Math.max(s(10), s(11));

  const rawUrls = collectSlideImageUrls(config);
  const urls = rawUrls.length > 0 ? rawUrls : [PLACEHOLDER];
  const n = urls.length;

  const { stripRef, index: i, scrollToIndex } = useSlideStripCarousel({
    slideCount: n,
    gapPx: 0,
    autoPlay: config.slideAutoPlay ?? false,
    autoPlayMs: config.slideAutoPlayMs ?? 3000,
  });

  const displayCur = Math.min(i + 1, n);

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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <div
                  ref={stripRef}
                  className="modal-preview-slide-strip"
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
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
                        flex: "0 0 100%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        scrollSnapAlign: "start",
                      }}
                      onError={(e) => {
                        e.target.src = PLACEHOLDER;
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: pb,
                  right: pr,
                  background: config.pagerBg ?? "rgba(0,0,0,0.8)",
                  borderRadius: "100px",
                  padding: `${s(3)}px ${s(8)}px`,
                  fontFamily: "Arial, sans-serif",
                  fontSize: `${pagerFs}px`,
                  lineHeight: `${s(13)}px`,
                  display: "flex",
                  gap: `${s(2)}px`,
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <span style={{ color: config.pagerTextActive ?? "#fff" }}>{displayCur}</span>
                <span style={{ color: config.pagerTextMuted ?? "#828282" }}>/</span>
                <span style={{ color: config.pagerTextMuted ?? "#828282" }}>{n}</span>
              </div>
            </div>

            {n > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: `${s(8)}px`,
                  marginTop: `${s(8)}px`,
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollToIndex(i - 1)}
                  style={{
                    padding: `${s(4)}px ${s(8)}px`,
                    fontSize: `${s(11)}px`,
                    cursor: "pointer",
                    borderRadius: `${s(6)}px`,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndex(i + 1)}
                  style={{
                    padding: `${s(4)}px ${s(8)}px`,
                    fontSize: `${s(11)}px`,
                    cursor: "pointer",
                    borderRadius: `${s(6)}px`,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                  }}
                >
                  ›
                </button>
              </div>
            )}

            <div style={modalPreviewBottomFootRowStyle}>
              <span
                style={modalPreviewBottomFootLeftStyle(
                  config.bottomColor,
                  "Pretendard, Inter, sans-serif",
                )}
              >
                {config.bottomLeftText}
              </span>
              <span
                style={modalPreviewBottomFootRightStyle(
                  config.bottomColor,
                  "Pretendard, Inter, sans-serif",
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

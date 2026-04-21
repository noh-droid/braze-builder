import { BRAND_COLOR } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function FigmaSlide11Settings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />
          <FieldLabel>카드 너비 (px)</FieldLabel>
          <SliderInput value={config.contentWidth ?? 339} onChange={v => onUpdate("contentWidth", v)} min={280} max={400} />

          <SectionTitle>슬라이드 이미지 (최대 6장)</SectionTitle>
          <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>
            등록한 이미지 수만큼 슬라이드가 생성되며, 우측 하단 배지는 1/N으로 표시됩니다.
          </div>
          <FieldLabel>슬라이드 1</FieldLabel>
          <PopupImageUpload value={config.imageUrl1} onChange={v => onUpdate("imageUrl1", v)} />
          <FieldLabel>슬라이드 2</FieldLabel>
          <PopupImageUpload value={config.imageUrl2} onChange={v => onUpdate("imageUrl2", v)} />
          <FieldLabel>슬라이드 3</FieldLabel>
          <PopupImageUpload value={config.imageUrl3} onChange={v => onUpdate("imageUrl3", v)} />
          <FieldLabel>슬라이드 4</FieldLabel>
          <PopupImageUpload value={config.imageUrl4} onChange={v => onUpdate("imageUrl4", v)} />
          <FieldLabel>슬라이드 5</FieldLabel>
          <PopupImageUpload value={config.imageUrl5} onChange={v => onUpdate("imageUrl5", v)} />
          <FieldLabel>슬라이드 6</FieldLabel>
          <PopupImageUpload value={config.imageUrl6} onChange={v => onUpdate("imageUrl6", v)} />
          <FieldLabel>3초 자동 슬라이드</FieldLabel>
          <CheckboxInput checked={config.slideAutoPlay ?? false} onChange={v => onUpdate("slideAutoPlay", v)} label="켜면 3초마다 다음 장으로 이동 (마지막 다음은 처음)" />
          <FieldLabel>모서리 (Radius)</FieldLabel>
          <SliderInput value={config.imageRadius} onChange={v => onUpdate("imageRadius", v)} min={0} max={30} />
          <FieldLabel>비율 가로</FieldLabel>
          <SliderInput value={config.imageAspectW ?? 339} onChange={v => onUpdate("imageAspectW", v)} min={300} max={400} />
          <FieldLabel>비율 세로</FieldLabel>
          <SliderInput value={config.imageAspectH ?? 342} onChange={v => onUpdate("imageAspectH", v)} min={280} max={500} />

          <SectionTitle>페이지 인디케이터 (1 / N)</SectionTitle>
          <FieldLabel>배지 배경</FieldLabel>
          <ColorInput value={config.pagerBg ?? "rgba(0,0,0,0.8)"} onChange={v => onUpdate("pagerBg", v)} />
          <FieldLabel>현재 숫자 색</FieldLabel>
          <ColorInput value={config.pagerTextActive ?? "#ffffff"} onChange={v => onUpdate("pagerTextActive", v)} />
          <FieldLabel>구분 / 총수 색</FieldLabel>
          <ColorInput value={config.pagerTextMuted ?? "#828282"} onChange={v => onUpdate("pagerTextMuted", v)} />

          <SectionTitle>Deeplink</SectionTitle>
          <FieldLabel>URL (추후 슬라이드 CTA용)</FieldLabel>
          <TextInput value={config.deeplink} onChange={v => onUpdate("deeplink", v)} placeholder="https://..." />

          <SectionTitle>하단 링크</SectionTitle>
          <FieldLabel>양쪽 마진 (px)</FieldLabel>
          <SliderInput value={config.bottomSideMargin ?? 20} onChange={v => onUpdate("bottomSideMargin", v)} min={0} max={40} />
          <FieldLabel>왼쪽</FieldLabel>
          <TextInput value={config.bottomLeftText} onChange={v => onUpdate("bottomLeftText", v)} />
          <FieldLabel>오른쪽</FieldLabel>
          <TextInput value={config.bottomRightText} onChange={v => onUpdate("bottomRightText", v)} />
          <FieldLabel>글자색</FieldLabel>
          <ColorInput value={config.bottomColor} onChange={v => onUpdate("bottomColor", v)} />
        </>
      )}

      {activeTab === "button" && (
        <div style={{ padding: "12px 0", fontSize: "13px", color: "#64748b" }}>
          이 템플릿은 이미지 위에 CTA 버튼이 없습니다. (Figma Slide_Modal_1:1)
        </div>
      )}

      {activeTab === "braze" && (
        <>
          <SectionTitle>Braze</SectionTitle>
          <CheckboxInput checked={config.enableLogClick} onChange={v => onUpdate("enableLogClick", v)} label="Enable logClick tracking" />
          <div style={{
            background: "#f0fdf4",
            border: `1px solid ${BRAND_COLOR}40`,
            borderRadius: "8px",
            padding: "14px",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "#334155",
            marginTop: "8px",
          }}>
            Figma <strong>Slide_Modal_1:1</strong> (14:473) — 최대 6장 캐러셀 + 1/N 배지. 추출 HTML은 scroll-snap + 소량의 JS만 사용합니다 (Swiper/Framer 없음).
          </div>
        </>
      )}
    </>
  );
}

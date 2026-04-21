import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function FigmaSlideHorizontalSettings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />

          <SectionTitle>카드</SectionTitle>
          <FieldLabel>너비 (px)</FieldLabel>
          <SliderInput value={config.cardWidth ?? 310} onChange={v => onUpdate("cardWidth", v)} min={280} max={360} />
          <FieldLabel>배경색</FieldLabel>
          <ColorInput value={config.cardBg ?? "#ffffff"} onChange={v => onUpdate("cardBg", v)} />

          <SectionTitle>슬라이드 (가로형 270×180, 최대 3장)</SectionTitle>
          <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>
            등록한 이미지 수만큼 슬라이드가 생성됩니다. 비워 둔 슬롯은 표시되지 않습니다. 스와이프로만 넘깁니다.
          </div>
          <FieldLabel>슬라이드 1</FieldLabel>
          <PopupImageUpload value={config.imageUrl1} onChange={v => onUpdate("imageUrl1", v)} />
          <FieldLabel>슬라이드 2</FieldLabel>
          <PopupImageUpload value={config.imageUrl2} onChange={v => onUpdate("imageUrl2", v)} />
          <FieldLabel>슬라이드 3</FieldLabel>
          <PopupImageUpload value={config.imageUrl3} onChange={v => onUpdate("imageUrl3", v)} />
          <FieldLabel>3초 자동 슬라이드</FieldLabel>
          <CheckboxInput checked={config.slideAutoPlay ?? false} onChange={v => onUpdate("slideAutoPlay", v)} label="켜면 3초마다 다음 장으로 이동 (마지막 다음은 처음)" />
          <FieldLabel>슬라이드 높이 (px)</FieldLabel>
          <SliderInput value={config.slideImageHeight ?? 180} onChange={v => onUpdate("slideImageHeight", v)} min={120} max={260} />
          <FieldLabel>슬라이드 모서리</FieldLabel>
          <SliderInput value={config.slideRadius ?? 4} onChange={v => onUpdate("slideRadius", v)} min={0} max={16} />

          <SectionTitle>텍스트</SectionTitle>
          <FieldLabel>제목</FieldLabel>
          <TextInput value={config.titleText} onChange={v => onUpdate("titleText", v)} />
          <FieldLabel>부제</FieldLabel>
          <TextInput value={config.subtitleText} onChange={v => onUpdate("subtitleText", v)} multiline />
          <FieldLabel>제목 크기</FieldLabel>
          <SliderInput value={config.titleSize ?? 20} onChange={v => onUpdate("titleSize", v)} min={12} max={28} />
          <FieldLabel>부제 크기</FieldLabel>
          <SliderInput value={config.subtitleSize ?? 13} onChange={v => onUpdate("subtitleSize", v)} min={10} max={18} />
          <FieldLabel>제목 색</FieldLabel>
          <ColorInput value={config.titleColor ?? "#000000"} onChange={v => onUpdate("titleColor", v)} />
          <FieldLabel>부제 색</FieldLabel>
          <ColorInput value={config.subtitleColor ?? "#000000"} onChange={v => onUpdate("subtitleColor", v)} />

          <SectionTitle>Deeplink</SectionTitle>
          <FieldLabel>URL</FieldLabel>
          <TextInput value={config.deeplink} onChange={v => onUpdate("deeplink", v)} placeholder="https://..." />
        </>
      )}

      {activeTab === "button" && (
        <>
          <SectionTitle>CTA 버튼</SectionTitle>
          <FieldLabel>텍스트</FieldLabel>
          <TextInput value={config.btnText} onChange={v => onUpdate("btnText", v)} />
          <FieldLabel>배경색</FieldLabel>
          <ColorInput value={config.btnBgColor ?? "#00dc64"} onChange={v => onUpdate("btnBgColor", v)} />
          <FieldLabel>글자색</FieldLabel>
          <ColorInput value={config.btnColor ?? "#ffffff"} onChange={v => onUpdate("btnColor", v)} />
          <FieldLabel>Font</FieldLabel>
          <SelectInput value={config.btnFont} onChange={v => onUpdate("btnFont", v)} options={FONT_OPTIONS} />
          <FieldLabel>Weight</FieldLabel>
          <SelectInput value={config.btnWeight} onChange={v => onUpdate("btnWeight", v)} options={WEIGHT_OPTIONS} />
          <FieldLabel>Size</FieldLabel>
          <SliderInput value={config.btnSize} onChange={v => onUpdate("btnSize", v)} min={10} max={24} />
          <FieldLabel>높이</FieldLabel>
          <SliderInput value={config.btnHeight ?? 46} onChange={v => onUpdate("btnHeight", v)} min={40} max={56} />
          <FieldLabel>Radius</FieldLabel>
          <SliderInput value={config.btnRadius ?? 4} onChange={v => onUpdate("btnRadius", v)} min={0} max={16} />

          <SectionTitle>하단</SectionTitle>
          <FieldLabel>왼쪽</FieldLabel>
          <TextInput value={config.bottomLeftText} onChange={v => onUpdate("bottomLeftText", v)} />
          <FieldLabel>오른쪽</FieldLabel>
          <TextInput value={config.bottomRightText} onChange={v => onUpdate("bottomRightText", v)} />
          <FieldLabel>글자색</FieldLabel>
          <ColorInput value={config.bottomColor} onChange={v => onUpdate("bottomColor", v)} />

          <SectionTitle>Tracking</SectionTitle>
          <FieldLabel>CTA Tracking ID</FieldLabel>
          <TextInput value={config.btnTracking} onChange={v => onUpdate("btnTracking", v)} />
          <FieldLabel>하단 왼쪽</FieldLabel>
          <TextInput value={config.bottomLeftTracking} onChange={v => onUpdate("bottomLeftTracking", v)} />
          <FieldLabel>하단 오른쪽</FieldLabel>
          <TextInput value={config.bottomRightTracking} onChange={v => onUpdate("bottomRightTracking", v)} />
        </>
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
            color: "#334155",
            marginTop: "8px",
          }}>
            Figma <strong>Slide_Modal_Horizontal</strong> (14:575) — 낮은 슬라이드 스트립 + 텍스트 + CTA.
          </div>
        </>
      )}
    </>
  );
}

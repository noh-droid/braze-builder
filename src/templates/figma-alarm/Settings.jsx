import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function FigmaAlarmSettings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />

          <SectionTitle>카드</SectionTitle>
          <FieldLabel>너비 (px)</FieldLabel>
          <SliderInput value={config.cardWidth ?? 299} onChange={v => onUpdate("cardWidth", v)} min={260} max={360} />
          <FieldLabel>배경색</FieldLabel>
          <ColorInput value={config.cardBg ?? "#ffffff"} onChange={v => onUpdate("cardBg", v)} />
          <FieldLabel>상단 패딩</FieldLabel>
          <SliderInput value={config.cardPaddingTop ?? 26} onChange={v => onUpdate("cardPaddingTop", v)} min={12} max={40} />
          <FieldLabel>좌우 패딩</FieldLabel>
          <SliderInput value={config.cardPaddingX ?? 20} onChange={v => onUpdate("cardPaddingX", v)} min={12} max={32} />
          <FieldLabel>하단 패딩</FieldLabel>
          <SliderInput value={config.cardPaddingBottom ?? 20} onChange={v => onUpdate("cardPaddingBottom", v)} min={12} max={40} />

          <SectionTitle>아이콘</SectionTitle>
          <FieldLabel>크기 (px)</FieldLabel>
          <SliderInput value={config.iconSize ?? 70} onChange={v => onUpdate("iconSize", v)} min={40} max={100} />
          <FieldLabel>이미지 (PNG/SVG)</FieldLabel>
          <PopupImageUpload value={config.iconUrl} onChange={v => onUpdate("iconUrl", v)} />
          <FieldLabel>아이콘 ↔ 텍스트 간격</FieldLabel>
          <SliderInput value={config.iconGap ?? 16} onChange={v => onUpdate("iconGap", v)} min={0} max={32} />

          <SectionTitle>텍스트</SectionTitle>
          <FieldLabel>제목</FieldLabel>
          <TextInput value={config.titleText} onChange={v => onUpdate("titleText", v)} />
          <FieldLabel>부제</FieldLabel>
          <TextInput value={config.subtitleText} onChange={v => onUpdate("subtitleText", v)} multiline />
          <FieldLabel>제목 폰트</FieldLabel>
          <SelectInput value={config.titleFont} onChange={v => onUpdate("titleFont", v)} options={FONT_OPTIONS} />
          <FieldLabel>부제 폰트</FieldLabel>
          <SelectInput value={config.subtitleFont} onChange={v => onUpdate("subtitleFont", v)} options={FONT_OPTIONS} />
          <FieldLabel>제목 크기</FieldLabel>
          <SliderInput value={config.titleSize ?? 20} onChange={v => onUpdate("titleSize", v)} min={12} max={28} />
          <FieldLabel>부제 크기</FieldLabel>
          <SliderInput value={config.subtitleSize ?? 13} onChange={v => onUpdate("subtitleSize", v)} min={10} max={18} />
          <FieldLabel>제목·부제 줄 간격</FieldLabel>
          <SliderInput value={config.textBlockGap ?? 7} onChange={v => onUpdate("textBlockGap", v)} min={0} max={20} />
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
            Figma <strong>Alarm_Modal</strong> (14:1318) — 상단 아이콘 + 제목/부제 + CTA + 하단 링크.
          </div>
        </>
      )}
    </>
  );
}

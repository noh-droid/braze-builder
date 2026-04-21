import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function SlideUpModalSettings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Overlay Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />

          <SectionTitle>Modal</SectionTitle>
          <FieldLabel>Background Color</FieldLabel>
          <SelectInput
            value={config.modalBgColor === "#FFFFFF" ? "#FFFFFF" : "#000000"}
            onChange={v => onUpdate("modalBgColor", v)}
            options={[
              { value: "#000000", label: "Black (#000000)" },
              { value: "#FFFFFF", label: "White (#FFFFFF)" },
            ]}
          />
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
            텍스트 색상은 배경에 맞춰 자동 적용됩니다.
          </div>

          <SectionTitle>Image</SectionTitle>
          <FieldLabel>메인 이미지</FieldLabel>
          <PopupImageUpload
            value={config.imageUrl}
            onChange={v => onUpdate("imageUrl", v)}
          >
            <div style={{
              marginTop: "10px",
              padding: "8px 10px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "11px",
              lineHeight: "1.6",
              color: "#64748b",
            }}>
              <span style={{ fontWeight: "600", color: "#475569" }}>형식:</span> JPG, PNG, WEBP (PNG 투명 가능)<br/>
              <span style={{ fontWeight: "600", color: "#475569" }}>권장:</span> 정사각형 56×56px ~ 64×64px
            </div>
          </PopupImageUpload>

          <SectionTitle>Text</SectionTitle>
          <FieldLabel>Line 1</FieldLabel>
          <TextInput value={config.textLine1} onChange={v => onUpdate("textLine1", v)} placeholder="잠깐! 휴재의 아쉬움을 달래 드릴게요!" />
          <FieldLabel>Line 2</FieldLabel>
          <TextInput value={config.textLine2} onChange={v => onUpdate("textLine2", v)} placeholder="<마루는 강쥐> 지금 보러가기" />
          <FieldLabel>Font</FieldLabel>
          <SelectInput value={config.font} onChange={v => onUpdate("font", v)} options={FONT_OPTIONS} />
          <FieldLabel>Weight</FieldLabel>
          <SelectInput value={config.weight} onChange={v => onUpdate("weight", v)} options={WEIGHT_OPTIONS} />
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
            텍스트 사이즈: 13px 고정
          </div>

          <SectionTitle>Deeplink</SectionTitle>
          <FieldLabel>URL (이미지+텍스트 클릭 시 이동)</FieldLabel>
          <TextInput value={config.deeplink} onChange={v => onUpdate("deeplink", v)} placeholder="https://..." />
        </>
      )}

      {activeTab === "button" && (
        <>
          <SectionTitle>Button Actions</SectionTitle>
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "#475569",
          }}>
            <div style={{ marginBottom: "4px" }}>
              <strong>이미지+텍스트 영역:</strong> logClick → Deeplink 이동
            </div>
            <div>
              <strong>원형 X 버튼:</strong> logClick → closeMessage
            </div>
          </div>

          <SectionTitle>Tracking Labels</SectionTitle>
          <FieldLabel>Landing Button Tracking ID</FieldLabel>
          <TextInput value={config.btnTracking} onChange={v => onUpdate("btnTracking", v)} placeholder="slide_up_landing" />
          <FieldLabel>Close Button Tracking ID</FieldLabel>
          <TextInput value={config.closeTracking} onChange={v => onUpdate("closeTracking", v)} placeholder="slide_up_close" />
        </>
      )}

      {activeTab === "braze" && (
        <>
          <SectionTitle>Braze Integration</SectionTitle>
          <CheckboxInput checked={config.enableLogClick} onChange={v => onUpdate("enableLogClick", v)} label="Enable logClick tracking" />

          <SectionTitle>How It Works</SectionTitle>
          <div style={{
            background: "#f0fdf4",
            border: `1px solid ${BRAND_COLOR}40`,
            borderRadius: "8px",
            padding: "14px",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "#334155",
            marginTop: "4px",
          }}>
            <div style={{ fontWeight: "700", marginBottom: "8px", color: BRAND_COLOR }}>
              Braze 연동 가이드
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>1.</strong> 오른쪽 상단 <strong>"Get Code"</strong> 클릭
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>2.</strong> 생성된 HTML 코드를 복사
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>3.</strong> Braze → In-App Messages → Custom Code
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>4.</strong> HTML 입력란에 붙여넣기
            </div>
            <div>
              <strong>5.</strong> 미리보기로 확인 후 캠페인 저장
            </div>
          </div>

          <SectionTitle>Button Actions</SectionTitle>
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "#475569",
          }}>
            <div style={{ marginBottom: "4px" }}>
              <strong>이미지+텍스트:</strong> logClick → Deeplink 이동
            </div>
            <div>
              <strong>원형 X:</strong> logClick → closeMessage
            </div>
          </div>
        </>
      )}
    </>
  );
}

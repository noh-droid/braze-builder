import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function TransparentModalSettings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity (배경 딤)</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />

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
              <span style={{ fontWeight: "600", color: "#475569" }}>형식:</span> JPG, PNG, WEBP (PNG 투명 권장)<br/>
              <span style={{ fontWeight: "600", color: "#475569" }}>비율:</span> 자유롭게 (팝업 전체 크기에 맞춤)
            </div>
          </PopupImageUpload>

          <SectionTitle>Deeplink</SectionTitle>
          <FieldLabel>URL</FieldLabel>
          <TextInput value={config.deeplink} onChange={v => onUpdate("deeplink", v)} placeholder="https://..." />
        </>
      )}

      {activeTab === "button" && (
        <>
          <SectionTitle>Main Button</SectionTitle>
          <FieldLabel>버튼 유형</FieldLabel>
          <SelectInput
            value={String(config.buttonCount ?? 2)}
            onChange={v => onUpdate("buttonCount", Number(v))}
            options={[
              { value: "0", label: "버튼 없음" },
              { value: "1", label: "버튼 1개" },
              { value: "2", label: "버튼 2개" },
            ]}
          />
          {(config.buttonCount ?? 2) !== 0 && (
          <>
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Button Text" : "Left Button Text"}</FieldLabel>
          <TextInput value={config.btnText} onChange={v => onUpdate("btnText", v)} />
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Text Color" : "Left Button Text Color"}</FieldLabel>
          <ColorInput value={config.btnColor} onChange={v => onUpdate("btnColor", v)} />
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Background Color" : "Left Button Background Color"}</FieldLabel>
          <ColorInput value={config.btnBgColor} onChange={v => onUpdate("btnBgColor", v)} />
          {(config.buttonCount ?? 2) === 2 && (
            <>
              <FieldLabel>Right Button Text</FieldLabel>
              <TextInput value={config.btnText2} onChange={v => onUpdate("btnText2", v)} />
              <FieldLabel>Right Button Text Color</FieldLabel>
              <ColorInput value={config.btn2Color ?? config.btnColor} onChange={v => onUpdate("btn2Color", v)} />
              <FieldLabel>Right Button Background Color</FieldLabel>
              <ColorInput value={config.btn2BgColor ?? config.btnBgColor} onChange={v => onUpdate("btn2BgColor", v)} />
            </>
          )}
          <FieldLabel>Font</FieldLabel>
          <SelectInput value={config.btnFont} onChange={v => onUpdate("btnFont", v)} options={FONT_OPTIONS} />
          <FieldLabel>Weight</FieldLabel>
          <SelectInput value={config.btnWeight} onChange={v => onUpdate("btnWeight", v)} options={WEIGHT_OPTIONS} />
          <FieldLabel>Size</FieldLabel>
          <SliderInput value={config.btnSize} onChange={v => onUpdate("btnSize", v)} min={10} max={24} />
          <FieldLabel>Radius</FieldLabel>
          <SliderInput value={config.btnRadius} onChange={v => onUpdate("btnRadius", v)} min={0} max={24} />
          </>
          )}

          <SectionTitle>Bottom Buttons</SectionTitle>
          <FieldLabel>Left Button Text</FieldLabel>
          <TextInput value={config.bottomLeftText} onChange={v => onUpdate("bottomLeftText", v)} />
          <FieldLabel>Right Button Text</FieldLabel>
          <TextInput value={config.bottomRightText} onChange={v => onUpdate("bottomRightText", v)} />
          <FieldLabel>Text Color</FieldLabel>
          <ColorInput value={config.bottomColor} onChange={v => onUpdate("bottomColor", v)} />

          <SectionTitle>Tracking Labels</SectionTitle>
          {(config.buttonCount ?? 2) !== 0 && (
          <>
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Button Tracking ID" : "Left Button Tracking ID"}</FieldLabel>
          <TextInput value={config.btnTracking} onChange={v => onUpdate("btnTracking", v)} placeholder="button" />
          {(config.buttonCount ?? 2) === 2 && (
            <>
              <FieldLabel>Right Button Tracking ID</FieldLabel>
              <TextInput value={config.btn2Tracking} onChange={v => onUpdate("btn2Tracking", v)} placeholder="close" />
            </>
          )}
          </>
          )}
          <FieldLabel>Bottom Left Tracking ID</FieldLabel>
          <TextInput value={config.bottomLeftTracking} onChange={v => onUpdate("bottomLeftTracking", v)} placeholder="never show" />
          <FieldLabel>Bottom Right Tracking ID</FieldLabel>
          <TextInput value={config.bottomRightTracking} onChange={v => onUpdate("bottomRightTracking", v)} placeholder="close" />
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
            {(config.buttonCount ?? 2) === 0 ? (
              <div style={{ marginBottom: "4px" }}>
                메인 버튼 없음 (하단 버튼으로만 닫기)
              </div>
            ) : (config.buttonCount ?? 2) === 1 ? (
              <div style={{ marginBottom: "4px" }}>
                <strong>Button:</strong> logClick → Deeplink 이동
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "4px" }}>
                  <strong>Left Button:</strong> logClick → Deeplink 이동
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <strong>Right Button:</strong> logClick → closeMessage
                </div>
              </>
            )}
            <div style={{ marginBottom: "4px" }}>
              <strong>Bottom Left:</strong> logClick → closeMessage
            </div>
            <div>
              <strong>Bottom Right:</strong> logClick → closeMessage
            </div>
          </div>

          <SectionTitle>Quick Presets</SectionTitle>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
            {[
              { label: "Brand Green", color: BRAND_COLOR },
              { label: "Blue", color: "#3B82F6" },
              { label: "Orange", color: "#F97316" },
              { label: "Purple", color: "#8B5CF6" },
              { label: "Red", color: "#EF4444" },
              { label: "Black", color: "#1e293b" },
            ].map(preset => (
              <button key={preset.color}
                onClick={() => onUpdate("btnBgColor", preset.color)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: config.btnBgColor === preset.color ? `2px solid ${preset.color}` : "1.5px solid #e2e8f0",
                  background: config.btnBgColor === preset.color ? `${preset.color}10` : "white",
                  fontSize: "12px", fontWeight: "600",
                  cursor: "pointer",
                  color: "#334155",
                }}>
                <div style={{
                  width: "14px", height: "14px",
                  borderRadius: "3px",
                  background: preset.color,
                }} />
                {preset.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

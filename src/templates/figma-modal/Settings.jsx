import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function FigmaModalSettings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />
          <FieldLabel>모달 너비 (px, Basic 1:1 기본 339)</FieldLabel>
          <SliderInput value={config.contentWidth ?? 339} onChange={v => onUpdate("contentWidth", v)} min={280} max={600} />

          <SectionTitle>이미지 (유일한 콘텐츠)</SectionTitle>
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
              1:1 정사각형 이미지만 등록하세요. 버튼은 이미지 위에 겹쳐 표시됩니다.
            </div>
          </PopupImageUpload>
          <FieldLabel>모서리 (Radius)</FieldLabel>
          <SliderInput value={config.imageRadius} onChange={v => onUpdate("imageRadius", v)} min={0} max={30} />

          <SectionTitle>Deeplink</SectionTitle>
          <FieldLabel>URL</FieldLabel>
          <TextInput value={config.deeplink} onChange={v => onUpdate("deeplink", v)} placeholder="https://..." />
        </>
      )}

      {activeTab === "button" && (
        <>
          <SectionTitle>이미지 위 버튼 (오버레이)</SectionTitle>
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
          <FieldLabel>버튼 행 너비 (px)</FieldLabel>
          <SliderInput value={config.btnRowWidth ?? 339} onChange={v => onUpdate("btnRowWidth", v)} min={260} max={400} />
          <FieldLabel>버튼 행 패딩 (px)</FieldLabel>
          <SliderInput value={config.btnRowPadding ?? 20} onChange={v => onUpdate("btnRowPadding", v)} min={0} max={32} />
          <FieldLabel>이미지 하단에서 버튼 행까지 (px)</FieldLabel>
          <SliderInput value={config.btnOverlayBottom ?? 0} onChange={v => onUpdate("btnOverlayBottom", v)} min={0} max={48} />
          <FieldLabel>버튼 간격 (px)</FieldLabel>
          <SliderInput value={config.btnGap ?? 9} onChange={v => onUpdate("btnGap", v)} min={0} max={24} />
          <FieldLabel>버튼 높이 (px)</FieldLabel>
          <SliderInput value={config.btnHeight ?? 46} onChange={v => onUpdate("btnHeight", v)} min={36} max={56} />

          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Button Text" : "왼쪽 버튼 텍스트"}</FieldLabel>
          <TextInput value={config.btnText} onChange={v => onUpdate("btnText", v)} />
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Text Color" : "왼쪽 글자색"}</FieldLabel>
          <ColorInput value={config.btnColor} onChange={v => onUpdate("btnColor", v)} />
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Background" : "왼쪽 배경색"}</FieldLabel>
          <ColorInput value={config.btnBgColor} onChange={v => onUpdate("btnBgColor", v)} />
          {(config.buttonCount ?? 2) === 2 && (
            <>
              <FieldLabel>오른쪽 버튼 텍스트</FieldLabel>
              <TextInput value={config.btnText2} onChange={v => onUpdate("btnText2", v)} />
              <FieldLabel>오른쪽 글자색</FieldLabel>
              <ColorInput value={config.btn2Color ?? config.btnColor} onChange={v => onUpdate("btn2Color", v)} />
              <FieldLabel>오른쪽 배경색</FieldLabel>
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

          <SectionTitle>버튼 아래 영역 (Don&apos;t show / Close)</SectionTitle>
          <FieldLabel>양쪽 마진 (px)</FieldLabel>
          <SliderInput value={config.bottomSideMargin ?? 20} onChange={v => onUpdate("bottomSideMargin", v)} min={0} max={40} />
          <FieldLabel>왼쪽 텍스트</FieldLabel>
          <TextInput value={config.bottomLeftText} onChange={v => onUpdate("bottomLeftText", v)} />
          <FieldLabel>오른쪽 텍스트</FieldLabel>
          <TextInput value={config.bottomRightText} onChange={v => onUpdate("bottomRightText", v)} />
          <FieldLabel>글자색</FieldLabel>
          <ColorInput value={config.bottomColor} onChange={v => onUpdate("bottomColor", v)} />

          <SectionTitle>Tracking Labels</SectionTitle>
          {(config.buttonCount ?? 2) !== 0 && (
          <>
          <FieldLabel>{(config.buttonCount ?? 2) === 1 ? "Button Tracking ID" : "왼쪽 버튼 Tracking ID"}</FieldLabel>
          <TextInput value={config.btnTracking} onChange={v => onUpdate("btnTracking", v)} placeholder="button" />
          {(config.buttonCount ?? 2) === 2 && (
            <>
              <FieldLabel>오른쪽 버튼 Tracking ID</FieldLabel>
              <TextInput value={config.btn2Tracking} onChange={v => onUpdate("btn2Tracking", v)} placeholder="close" />
            </>
          )}
          </>
          )}
          <FieldLabel>하단 왼쪽 Tracking ID</FieldLabel>
          <TextInput value={config.bottomLeftTracking} onChange={v => onUpdate("bottomLeftTracking", v)} placeholder="never show" />
          <FieldLabel>하단 오른쪽 Tracking ID</FieldLabel>
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
                  <strong>왼쪽 버튼:</strong> logClick → Deeplink 이동
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <strong>오른쪽 버튼:</strong> logClick → closeMessage
                </div>
              </>
            )}
            <div style={{ marginBottom: "4px" }}>
              <strong>하단 왼쪽:</strong> logClick → closeMessage
            </div>
            <div>
              <strong>하단 오른쪽:</strong> logClick → closeMessage
            </div>
          </div>

          <SectionTitle>Figma 색상 프리셋</SectionTitle>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
            {[
              { label: "Magenta (Figma)", color: "#eb00ff" },
              { label: "Violet (Figma)", color: "#5700ff" },
            ].map(preset => (
              <button key={preset.label}
                type="button"
                onClick={() => {
                  if (preset.color === "#eb00ff") onUpdate("btnBgColor", preset.color);
                  else onUpdate("btn2BgColor", preset.color);
                }}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1.5px solid #e2e8f0",
                  background: "white",
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

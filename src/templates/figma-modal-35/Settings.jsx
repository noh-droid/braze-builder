import { BRAND_COLOR } from "../../components/ui/constants";
import { FONT_OPTIONS, WEIGHT_OPTIONS } from "../../components/ui/constants";
import {
  SectionTitle, FieldLabel, TextInput, ColorInput,
  SliderInput, SelectInput, CheckboxInput,
  PopupImageUpload,
} from "../../components/ui/index.jsx";

export default function FigmaModal35Settings({ config, onUpdate, activeTab }) {
  return (
    <>
      {activeTab === "contents" && (
        <>
          <SectionTitle>Background</SectionTitle>
          <FieldLabel>Opacity</FieldLabel>
          <SliderInput value={config.bgOpacity} onChange={v => onUpdate("bgOpacity", v)} />
          <FieldLabel>모달 너비 (px)</FieldLabel>
          <SliderInput value={config.contentWidth ?? 339} onChange={v => onUpdate("contentWidth", v)} min={280} max={400} />

          <SectionTitle>이미지 (3:5 비율)</SectionTitle>
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
              Figma Basic Modal 3:5 — 세로 이미지. 버튼은 이미지 위에 겹칩니다.
            </div>
          </PopupImageUpload>
          <FieldLabel>모서리 (Radius)</FieldLabel>
          <SliderInput value={config.imageRadius} onChange={v => onUpdate("imageRadius", v)} min={0} max={30} />
          <FieldLabel>비율 가로 (px)</FieldLabel>
          <SliderInput value={config.imageAspectW ?? 339} onChange={v => onUpdate("imageAspectW", v)} min={300} max={400} />
          <FieldLabel>비율 세로 (px)</FieldLabel>
          <SliderInput value={config.imageAspectH ?? 582} onChange={v => onUpdate("imageAspectH", v)} min={400} max={800} />

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
          <FieldLabel>좌우 마진 (px)</FieldLabel>
          <SliderInput value={config.btnOverlaySideMargin ?? 20} onChange={v => onUpdate("btnOverlaySideMargin", v)} min={0} max={40} />
          <FieldLabel>하단 여백 (px)</FieldLabel>
          <SliderInput value={config.btnOverlayBottom ?? 20} onChange={v => onUpdate("btnOverlayBottom", v)} min={0} max={48} />
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

          <SectionTitle>버튼 아래 영역</SectionTitle>
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
            Figma <strong>Basic_Modal_3:5</strong> 프레임(14:466)과 동일한 레이아웃입니다.
          </div>
        </>
      )}
    </>
  );
}

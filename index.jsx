import { BRAND_COLOR, ALIGN_OPTIONS } from "./constants";

export { PopupImageUpload } from "./PopupImageUpload.jsx";

export const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: BRAND_COLOR,
    marginTop: "24px",
    marginBottom: "10px",
    padding: "6px 10px",
    borderRadius: "5px",
    background: `${BRAND_COLOR}0A`,
    borderLeft: `3px solid ${BRAND_COLOR}`,
  }}>{children}</div>
);

export const FieldLabel = ({ children }) => (
  <div style={{
    fontSize: "12px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "4px",
    marginTop: "10px",
  }}>{children}</div>
);

export const TextInput = ({ value, onChange, placeholder, multiline }) => {
  const style = {
    width: "100%",
    padding: "8px 10px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "Pretendard, sans-serif",
    color: "#1e293b",
    background: "#f8fafc",
    outline: "none",
    transition: "border-color 0.2s",
    resize: multiline ? "vertical" : "none",
  };
  if (multiline) {
    return <textarea rows={3} style={style} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => e.target.style.borderColor = BRAND_COLOR} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />;
  }
  return <input type="text" style={style} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => e.target.style.borderColor = BRAND_COLOR} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />;
};

export const ColorInput = ({ value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input type="color" value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "32px", height: "32px", border: "1.5px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", padding: "2px" }} />
    <input type="text" value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "90px", padding: "6px 8px", border: "1.5px solid #e2e8f0", borderRadius: "6px", fontSize: "12px", fontFamily: "monospace", color: "#334155", background: "#f8fafc" }} />
  </div>
);

export const SliderInput = ({ value, onChange, min = 0, max = 100 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
      style={{ flex: 1, accentColor: BRAND_COLOR, height: "4px" }} />
    <span style={{ fontSize: "12px", fontWeight: "600", color: "#475569", minWidth: "28px", textAlign: "right" }}>{value}</span>
  </div>
);

export const SelectInput = ({ value, onChange, options }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{
      width: "100%",
      padding: "7px 10px",
      border: "1.5px solid #e2e8f0",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#334155",
      background: "#f8fafc",
      fontFamily: "Pretendard, sans-serif",
      cursor: "pointer",
    }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

export const AlignButtons = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {ALIGN_OPTIONS.map(a => (
      <button key={a} onClick={() => onChange(a)}
        style={{
          padding: "5px 12px",
          border: value === a ? `1.5px solid ${BRAND_COLOR}` : "1.5px solid #e2e8f0",
          borderRadius: "5px",
          background: value === a ? `${BRAND_COLOR}15` : "#f8fafc",
          color: value === a ? BRAND_COLOR : "#94a3b8",
          fontSize: "13px",
          cursor: "pointer",
          fontWeight: "600",
        }}>
        {a === "left" ? "≡" : a === "center" ? "≡" : "≡"}
        <span style={{ fontSize: "10px", marginLeft: "2px" }}>{a[0].toUpperCase()}</span>
      </button>
    ))}
  </div>
);

export const CheckboxInput = ({ checked, onChange, label }) => (
  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#334155", marginTop: "6px" }}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
      style={{ accentColor: BRAND_COLOR, width: "16px", height: "16px" }} />
    {label}
  </label>
);

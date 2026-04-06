import { useState, useCallback } from "react";
import TEMPLATES from "./templates";
import { BRAND_COLOR, BRAND_DARK } from "./components/ui/constants";

export default function BrazeTemplateBuilder() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const template = TEMPLATES.find(t => t.id === selectedTemplateId);

  const [config, setConfig] = useState(template.defaultConfig);
  const [activeTab, setActiveTab] = useState("contents");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const update = useCallback((key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleTemplateChange = useCallback((id) => {
    const next = TEMPLATES.find(t => t.id === id);
    if (!next) return;
    setSelectedTemplateId(id);
    setConfig(next.defaultConfig);
    setActiveTab("contents");
    setShowCode(false);
    setSelectorOpen(false);
  }, [setSelectedTemplateId, setConfig, setActiveTab, setShowCode, setSelectorOpen]);

  const generatedCode = template.generateCode(config);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedCode, setCopied]);

  const TABS = [
    { id: "contents", label: "Contents" },
    { id: "button", label: "Button" },
    { id: "braze", label: "Braze" },
  ];

  const Preview = template.Preview;
  const Settings = template.Settings;

  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      fontFamily: "Pretendard, -apple-system, sans-serif",
      background: "#f1f5f9",
      color: "#1e293b",
      overflow: "hidden",
    }}>
      {/* Top Bar */}
      <div style={{
        height: "56px", minHeight: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px",
            borderRadius: "8px",
            background: BRAND_COLOR,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "800", fontSize: "14px",
          }}>B</div>
          <span style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a", letterSpacing: "-0.01em" }}>
            Braze Template Builder
          </span>

          {/* Template Selector */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 12px",
                borderRadius: "8px",
                border: `1.5px solid ${BRAND_COLOR}40`,
                background: `${BRAND_COLOR}08`,
                fontSize: "13px", fontWeight: "600",
                cursor: "pointer",
                color: "#334155",
                transition: "all 0.15s",
              }}>
              <span style={{
                width: "8px", height: "8px",
                borderRadius: "2px",
                background: BRAND_COLOR,
              }} />
              {template.label}
              <span style={{ fontSize: "10px", color: "#94a3b8", marginLeft: "2px" }}>
                {selectorOpen ? "▲" : "▼"}
              </span>
            </button>

            {selectorOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 99 }}
                  onClick={() => setSelectorOpen(false)}
                />
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  minWidth: "240px",
                  background: "white",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  zIndex: 100,
                  overflow: "hidden",
                }}>
                  <div style={{
                    padding: "10px 14px 6px",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#94a3b8",
                  }}>Templates</div>
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t.id)}
                      style={{
                        width: "100%",
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 14px",
                        border: "none",
                        background: t.id === selectedTemplateId ? `${BRAND_COLOR}10` : "transparent",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        textAlign: "left",
                      }}
                      onMouseEnter={e => { if (t.id !== selectedTemplateId) e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = t.id === selectedTemplateId ? `${BRAND_COLOR}10` : "transparent"; }}
                    >
                      <div style={{
                        width: "28px", height: "28px",
                        borderRadius: "6px",
                        background: t.id === selectedTemplateId ? BRAND_COLOR : "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: t.id === selectedTemplateId ? "white" : "#94a3b8",
                        fontSize: "12px", fontWeight: "700",
                        flexShrink: 0,
                      }}>
                        {t.label.charAt(0)}
                      </div>
                      <div>
                        <div style={{
                          fontSize: "13px",
                          fontWeight: t.id === selectedTemplateId ? "700" : "500",
                          color: t.id === selectedTemplateId ? BRAND_COLOR : "#334155",
                        }}>{t.label}</div>
                        {t.description && (
                          <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "1px" }}>
                            {t.description}
                          </div>
                        )}
                      </div>
                      {t.id === selectedTemplateId && (
                        <span style={{ marginLeft: "auto", color: BRAND_COLOR, fontSize: "14px", fontWeight: "700" }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowCode(false)}
            style={{
              padding: "8px 16px", borderRadius: "8px",
              border: "1.5px solid #e2e8f0", background: !showCode ? "#f8fafc" : "white",
              fontSize: "13px", fontWeight: "600", cursor: "pointer",
              color: "#475569",
            }}>
            Editor
          </button>
          <button onClick={() => setShowCode(true)}
            style={{
              padding: "8px 20px", borderRadius: "8px",
              border: "none",
              background: showCode ? BRAND_DARK : BRAND_COLOR,
              color: "white", fontSize: "13px", fontWeight: "700",
              cursor: "pointer",
              boxShadow: `0 2px 8px ${BRAND_COLOR}40`,
            }}>
            { showCode ? "✓ Code View" : "</> Get Code" }
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left: Preview */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#e8ecf1",
          backgroundImage: "radial-gradient(circle at 1px 1px, #d4d8dd 1px, transparent 0)",
          backgroundSize: "24px 24px",
          position: "relative",
        }}>
          {showCode ? (
            <div style={{
              width: "90%", maxWidth: "900px", height: "85%",
              background: "#1e293b",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px",
                background: "#0f172a",
                borderBottom: "1px solid #334155",
              }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "99px", background: "#ef4444" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "99px", background: "#eab308" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "99px", background: "#22c55e" }} />
                </div>
                <span style={{ fontSize: "12px", color: "#64748b" }}>braze-custom-html.html</span>
                <button onClick={handleCopy}
                  style={{
                    padding: "5px 14px", borderRadius: "6px",
                    background: copied ? "#22c55e" : BRAND_COLOR,
                    color: "white", fontSize: "12px", fontWeight: "600",
                    border: "none", cursor: "pointer",
                    transition: "background 0.2s",
                  }}>
                  {copied ? "✓ Copied!" : "Copy Code"}
                </button>
              </div>
              <pre style={{
                flex: 1, overflow: "auto",
                padding: "20px",
                margin: 0,
                fontSize: "12px", lineHeight: "1.6",
                color: "#e2e8f0",
                fontFamily: "'SF Mono', 'Fira Code', monospace",
              }}>
                <code>{generatedCode}</code>
              </pre>
            </div>
          ) : (
            <Preview config={config} />
          )}
        </div>

        {/* Right: Settings Panel */}
        <div style={{
          width: "340px", minWidth: "340px",
          background: "#ffffff",
          borderLeft: "1px solid #e2e8f0",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Tabs */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid #e2e8f0",
            padding: "0 16px",
            background: "#fafbfc",
          }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 16px",
                  border: "none",
                  borderBottom: activeTab === tab.id ? `2.5px solid ${BRAND_COLOR}` : "2.5px solid transparent",
                  background: "none",
                  color: activeTab === tab.id ? BRAND_COLOR : "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "Pretendard, sans-serif",
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div style={{ flex: 1, overflow: "auto", padding: "0 16px 24px 16px" }}>
            <Settings config={config} onUpdate={update} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

const getTextColor = (modalBgColor) =>
  (modalBgColor || "#000000").toUpperCase().replace(/\s/g, "") === "#000000" ? "#ffffff" : "#000000";

export default function SlideUpModalPreview({ config }) {
  const textColor = getTextColor(config.modalBgColor);
  return (
    <div style={{
      width: "375px", height: "680px",
      background: "#000",
      borderRadius: "40px",
      padding: "12px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)",
      position: "relative",
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)",
        width: "120px", height: "28px",
        background: "#000", borderRadius: "0 0 16px 16px",
        zIndex: 5,
      }} />
      {/* Screen */}
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "30px",
        overflow: "hidden",
        background: `rgba(0,0,0,${config.bgOpacity / 100})`,
        display: "flex", flexDirection: "column",
        position: "relative",
      }}>
        {/* App content */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(180deg, #f0f4f8 0%, #dfe6ed 100%)",
          opacity: 1 - config.bgOpacity / 100,
        }}>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>Bottom of App Screen</span>
        </div>

        {/* Slide Up Modal - anchored to bottom, 16px margin */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          right: "16px",
          zIndex: 2,
          background: config.modalBgColor,
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        }}>
          {/* Landing button: Image + Text */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            minWidth: 0,
          }}>
            <div style={{
              width: "56px", height: "56px",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
              background: "transparent",
            }}>
              <img src={config.imageUrl} alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={(e) => { e.target.src = "https://placehold.co/64x64/e2e8f0/94a3b8?text=IMG"; }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: "13px",
                fontWeight: config.weight,
                color: textColor,
                fontFamily: `${config.font}, sans-serif`,
                lineHeight: 1.4,
                marginBottom: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}>{config.textLine1}</div>
              <div style={{
                fontSize: "13px",
                fontWeight: config.weight,
                color: textColor,
                fontFamily: `${config.font}, sans-serif`,
                opacity: 0.9,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}>{config.textLine2}</div>
            </div>
          </div>

          {/* Circular X button - 1/4 of modal height (~20px) */}
          <div style={{
            width: "20px", height: "20px",
            borderRadius: "50%",
            background: textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}>
            <span style={{ color: textColor, fontSize: "12px", fontWeight: "600", lineHeight: 1 }}>✕</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TransparentModalPreview({ config }) {
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
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {/* App content behind */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #f0f4f8 0%, #dfe6ed 100%)",
          opacity: 1 - config.bgOpacity / 100,
        }} />

        {/* Modal + Bottom buttons wrapper */}
        <div style={{
          width: "310px",
          maxHeight: "calc(100% - 32px)",
          zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Modal - transparent background */}
          <div style={{
            width: "100%",
            minHeight: 0,
            flex: "1 1 auto",
            overflow: "hidden",
            background: "transparent",
            display: "flex", flexDirection: "column",
            padding: 0,
          }}>
            {/* Full-size Image */}
            <div style={{
              width: "100%",
              flex: "1 1 auto",
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <img src={config.imageUrl} alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => { e.target.src = "https://placehold.co/310x400/e2e8f0/94a3b8?text=PNG+Image"; }}
              />
            </div>

            {/* Buttons */}
            {(config.buttonCount ?? 2) !== 0 && (
            <div style={{ padding: "0 4px 16px 4px", display: "flex", gap: (config.buttonCount ?? 2) === 2 ? "6px" : 0 }}>
              <div style={{
                flex: 1, height: "44px",
                borderRadius: `${config.btnRadius}px`,
                background: config.btnBgColor,
                color: config.btnColor,
                fontSize: `${config.btnSize}px`,
                fontWeight: config.btnWeight,
                fontFamily: `${config.btnFont}, sans-serif`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>{config.btnText}</div>
              {(config.buttonCount ?? 2) === 2 && (
                <div style={{
                  flex: 1, height: "44px",
                  borderRadius: `${config.btnRadius}px`,
                  background: config.btn2BgColor ?? config.btnBgColor,
                  color: config.btn2Color ?? config.btnColor,
                  fontSize: `${config.btnSize}px`,
                  fontWeight: config.btnWeight,
                  fontFamily: `${config.btnFont}, sans-serif`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}>{config.btnText2}</div>
              )}
            </div>
            )}
          </div>

          {/* Bottom buttons */}
          <div style={{
            width: "100%",
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 4px 0 4px",
          }}>
            <span style={{ color: config.bottomColor, fontSize: "13px", fontFamily: `${config.btnFont}, sans-serif` }}>{config.bottomLeftText}</span>
            <span style={{ color: config.bottomColor, fontSize: "13px", display: "flex", alignItems: "center", gap: "2px", fontFamily: `${config.btnFont}, sans-serif` }}>
              {config.bottomRightText} ✕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

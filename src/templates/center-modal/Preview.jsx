export default function CenterModalPreview({ config }) {
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
          width: "280px",
          maxHeight: "calc(100% - 32px)",
          zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Modal */}
          <div style={{
            width: "100%",
            minHeight: 0,
            flex: "1 1 auto",
            borderRadius: `${config.bgRadius}px`,
            overflow: "hidden",
            background: config.bgColor,
            backgroundImage: config.bgImage ? `url(${config.bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "column",
            padding: "8px 8px 0 8px",
          }}>
            {/* Image */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              flex: "0 0 auto",
              borderRadius: `${config.imageRadius}px`,
              overflow: "hidden",
              background: "#e2e8f0",
            }}>
              <img src={config.imageUrl} alt="preview"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  borderRadius: `${config.imageRadius}px`,
                }}
                onError={(e) => { e.target.src = "https://placehold.co/295x295/e2e8f0/94a3b8?text=Image"; }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "16px 4px" }}>
              <div style={{
                textAlign: config.titleAlign,
                color: config.titleColor,
                fontSize: `${config.titleSize}px`,
                fontWeight: config.titleWeight,
                fontFamily: `${config.titleFont}, sans-serif`,
                lineHeight: "1.4",
                marginBottom: "6px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>{config.titleText}</div>
              <div style={{
                textAlign: config.subAlign,
                color: config.subColor,
                fontSize: `${config.subSize}px`,
                fontWeight: config.subWeight,
                fontFamily: `${config.subFont}, sans-serif`,
                lineHeight: "1.54",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                overflow: "hidden",
              }}>{config.subText}</div>
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
            <span style={{ color: config.bottomColor, fontSize: "13px", fontFamily: `${config.titleFont}, sans-serif` }}>{config.bottomLeftText}</span>
            <span style={{ color: config.bottomColor, fontSize: "13px", display: "flex", alignItems: "center", gap: "2px", fontFamily: `${config.titleFont}, sans-serif` }}>
              {config.bottomRightText} ✕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

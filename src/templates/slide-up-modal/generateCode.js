import { escapeHtml } from "../../components/ui/utils";

const getTextColor = (modalBgColor) =>
  (modalBgColor || "#000000").toUpperCase().replace(/\s/g, "") === "#000000" ? "#ffffff" : "#000000";

export function generateCode(c) {
  const textColor = getTextColor(c.modalBgColor);
  return `<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; list-style: none; text-decoration: none; }
    html, body { height: 100%; overflow: hidden; font-size: 16px; }
    a { color: #000; cursor: pointer; }
    button { background: none; border: none; cursor: pointer; }

    .root {
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      overflow: hidden; position: relative; background: none;
    }
    .background {
      width: 100%; height: 100%;
      position: absolute; top: 0;
      background: rgba(0, 0, 0, ${c.bgOpacity / 100});
    }
    .slide_up_modal {
      position: absolute;
      bottom: 16px; left: 16px; right: 16px;
      background: ${c.modalBgColor};
      border-radius: 8px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
      z-index: 10;
    }
    .landing_btn {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      min-width: 0;
    }
    .landing_btn .thumb {
      width: 56px; height: 56px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      background: transparent;
    }
    .landing_btn .thumb img {
      width: 100%; height: 100%;
      object-fit: contain;
    }
    .landing_btn .text_wrap {
      flex: 1;
      min-width: 0;
    }
    .landing_btn .text_wrap .line1 {
      font-size: 13px;
      font-weight: ${c.weight};
      color: ${textColor};
      font-family: ${c.font}, sans-serif;
      line-height: 1.4;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
    }
    .landing_btn .text_wrap .line2 {
      font-size: 13px;
      font-weight: ${c.weight};
      color: ${textColor};
      font-family: ${c.font}, sans-serif;
      opacity: 0.9;
      white-space: nowrap;
      overflow: hidden;
    }
    .close_btn {
      width: 20px; height: 20px;
      border-radius: 50%;
      background: ${textColor === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
    }
    .close_btn span {
      color: ${textColor};
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="root">
    <div class="background" onclick="appboyBridge.logClick('background'); appboyBridge.closeMessage();"></div>
    <div class="slide_up_modal">
      <div class="landing_btn">
        <div class="thumb">
          <img src="${c.imageUrl}" alt="" />
        </div>
        <div class="text_wrap">
          <div class="line1">${escapeHtml(c.textLine1)}</div>
          <div class="line2">${escapeHtml(c.textLine2)}</div>
        </div>
      </div>
      <div class="close_btn">
        <span>✕</span>
      </div>
    </div>
    <div id="deeplink" style="display:none;">"${escapeHtml(c.deeplink)}"</div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var content = document.getElementById("deeplink").textContent;
      var link = content.replace(/\\n|\\t/g, "").trim();
      var deeplink = JSON.parse(link);

      document.querySelector(".landing_btn").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.btnTracking}");` : ""}
        } catch(e) {}
        window.location = deeplink;
      });

      document.querySelector(".close_btn").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.closeTracking}");` : ""}
        } catch(e) {}
        appboyBridge.closeMessage();
      });
    });
  </script>
  <a href="appboy://close"></a>
</body>
</html>`;
}

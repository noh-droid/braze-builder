import { escapeHtml } from "../../components/ui/utils";
import {
  isFullModalWidth,
  MODAL_MAX_WIDTH,
  MODAL_WIDTH_PERCENT,
  scaleDesignPx,
} from "../../constants/modalViewport.js";

const s = scaleDesignPx;

export function generateCode(c) {
  const bottom = c.btnOverlayBottom ?? 0;
  const bottomSide = c.bottomSideMargin ?? 20;
  const rowW = isFullModalWidth(c.btnRowWidth ?? 339)
    ? "100%"
    : `${s(c.btnRowWidth)}px`;
  const rowPad = s(c.btnRowPadding ?? 20);
  const mtBottom = s(8);
  const iconClose = s(20);

  return `<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; list-style: none; text-decoration: none; }
    html, body { height: 100%; overflow: hidden; font-size: 16px; }
    a { color: #000; cursor: pointer; }
    button { background: none; border: none; cursor: pointer; }

    .root {
      width: 100%; height: 100%;
      display: flex; justify-content: center; align-items: center;
      overflow: hidden; position: relative; background: none;
    }
    .background {
      width: 100%; height: 100%;
      position: absolute; top: 0;
      background: rgba(0, 0, 0, ${c.bgOpacity / 100});
    }
    .center {
      width: ${MODAL_WIDTH_PERCENT}%;
      max-width: ${MODAL_MAX_WIDTH}px;
      position: absolute;
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      display: flex; flex-direction: column;
      align-items: stretch;
    }
    .hero_wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: ${s(c.imageRadius ?? 14)}px;
      overflow: hidden;
    }
    .hero_img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }
    .btn_row {
      position: absolute;
      left: 50%;
      bottom: ${s(bottom)}px;
      transform: translateX(-50%);
      width: ${rowW};
      max-width: 100%;
      padding: ${rowPad}px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: ${s(c.btnGap ?? 9)}px;
    }
    .btn_row button {
      flex: 1 1 0%;
      min-width: 0;
      height: ${s(c.btnHeight ?? 46)}px;
      border-radius: ${s(c.btnRadius ?? 4)}px;
      outline: 0; border: 0;
      font-size: ${s(c.btnSize ?? 15) / 16}rem;
      font-weight: ${c.btnWeight};
      font-family: ${c.btnFont}, sans-serif;
      cursor: pointer;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .btn_row .button_text {
      color: ${c.btnColor};
      background-color: ${c.btnBgColor};
    }
    ${(c.buttonCount ?? 2) === 2 ? `
    .btn_row .button_text2 {
      color: ${c.btn2Color || c.btnColor};
      background-color: ${c.btn2BgColor || c.btnBgColor};
    }
    ` : ""}
    .bottom_wrapper {
      display: flex; justify-content: space-between;
      align-items: center; margin-top: ${mtBottom}px;
      padding-left: ${s(bottomSide)}px; padding-right: ${s(bottomSide)}px;
    }
    .bottom_wrapper .style01 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      color: ${c.bottomColor};
      font-weight: 400; font-size: ${s(12) / 16}rem;
      font-family: Pretendard, sans-serif;
    }
    .bottom_wrapper .style02 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      text-align: right;
      color: ${c.bottomColor};
      font-weight: 400; font-size: ${s(12) / 16}rem;
      font-family: Pretendard, sans-serif;
    }
  </style>
</head>
<body>
  <div class="root">
    <div class="background" onclick="appboyBridge.logClick('background'); appboyBridge.closeMessage();"></div>
    <div class="center">
      <div class="hero_wrap">
        <img class="hero_img" src="${escapeHtml(c.imageUrl)}" alt="modal image" />
        ${(c.buttonCount ?? 2) !== 0 ? `
        <div class="btn_row">
          <button class="button_text">${escapeHtml(c.btnText)}</button>
          ${(c.buttonCount ?? 2) === 2 ? `<button class="button_text2">${escapeHtml(c.btnText2 || "Close")}</button>` : ""}
        </div>
        ` : ""}
      </div>
      <div class="bottom_wrapper">
        <button class="style01">${escapeHtml(c.bottomLeftText)}</button>
        <div style="display:flex;justify-content:center;align-items:center;">
          <button class="style02">${escapeHtml(c.bottomRightText)}</button>
          <span class="material-icons" style="font-size:${iconClose}px;padding-bottom:${s(1.6)}px;color:${c.bottomColor}">close</span>
        </div>
      </div>
    </div>
    <div id="deeplink" style="display:none;">"${escapeHtml(c.deeplink)}"</div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var content = document.getElementById("deeplink").textContent;
      var link = content.replace(/\\n|\\t/g, "").trim();
      var deeplink = JSON.parse(link);

      ${(c.buttonCount ?? 2) !== 0 ? `
      document.querySelector(".button_text").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.btnTracking}");` : ""}
          ${c.enableCustomEvent && c.customEventName ? `appboyBridge.logCustomEvent("${c.customEventName}");` : ""}
        } catch(e) {}
        window.location = deeplink;
      });
      ` : ""}

      ${(c.buttonCount ?? 2) === 2 ? `
      document.querySelector(".button_text2").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.btn2Tracking}");` : ""}
        } catch(e) {}
        appboyBridge.closeMessage();
      });
      ` : ""}

      document.querySelector(".style01").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.bottomLeftTracking}");` : ""}
        } catch(e) {}
        appboyBridge.closeMessage();
      });

      document.querySelector(".style02").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.bottomRightTracking}");` : ""}
        } catch(e) {}
        appboyBridge.closeMessage();
      });
    });
  </script>
  <a href="appboy://close"></a>
</body>
</html>`;
}

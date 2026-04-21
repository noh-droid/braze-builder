import { escapeHtml } from "../../components/ui/utils";
import {
  MODAL_MAX_WIDTH,
  MODAL_WIDTH_PERCENT,
  scaleDesignPx,
} from "../../constants/modalViewport.js";

const s = scaleDesignPx;

export function generateCode(c) {
  const px = c.cardPaddingX ?? 20;
  const pt = c.cardPaddingTop ?? 26;
  const pb = c.cardPaddingBottom ?? 20;
  const isz = c.iconSize ?? 70;
  const ig = c.iconGap ?? 16;
  const tg = c.textBlockGap ?? 7;
  const padX = s(px);

  return `<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; font-size: 16px; }
    button { border: none; cursor: pointer; font-family: Inter, sans-serif; }

    .root {
      width: 100%; height: 100%;
      display: flex; justify-content: center; align-items: center;
      overflow: hidden; position: relative;
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
    }
    .card {
      background: ${c.cardBg ?? "#ffffff"};
      border-radius: ${s(14)}px;
      overflow: hidden;
      padding: ${s(pt)}px ${padX}px ${s(pb)}px;
    }
    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${s(ig)}px;
    }
    .icon_wrap {
      width: ${s(isz)}px; height: ${s(isz)}px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon_wrap img {
      width: 100%; height: 100%;
      object-fit: contain;
    }
    .text_block {
      display: flex;
      flex-direction: column;
      gap: ${s(tg)}px;
      width: 100%;
      text-align: center;
    }
    .title {
      font-family: ${c.titleFont ?? "Inter"}, sans-serif;
      font-weight: 700;
      font-size: ${s(c.titleSize ?? 20) / 16}rem;
      line-height: 1.25;
      color: ${c.titleColor ?? "#000"};
    }
    .sub {
      font-family: ${c.subtitleFont ?? "Inter"}, sans-serif;
      font-weight: 400;
      font-size: ${s(c.subtitleSize ?? 13) / 16}rem;
      line-height: 1.45;
      color: ${c.subtitleColor ?? "#000"};
    }
    .cta {
      margin-top: ${s(4)}px;
      width: calc(100% + ${padX * 2}px);
      margin-left: -${padX}px;
      margin-right: -${padX}px;
      height: ${s(c.btnHeight ?? 46)}px;
      border-radius: ${s(c.btnRadius ?? 4)}px;
      background: ${c.btnBgColor ?? "#00dc64"};
      color: ${c.btnColor ?? "#ffffff"};
      font-size: ${s(c.btnSize ?? 15) / 16}rem;
      font-weight: ${c.btnWeight ?? "700"};
    }
    .bottom_wrapper {
      display: flex; justify-content: space-between;
      align-items: center; margin-top: ${s(12)}px; padding-top: ${s(6)}px;
    }
    .bottom_wrapper button {
      background: none;
      color: ${c.bottomColor};
      font-size: ${s(11) / 16}rem;
      font-family: Inter, sans-serif;
    }
  </style>
</head>
<body>
  <div class="root">
    <div class="background" onclick="appboyBridge.logClick('background'); appboyBridge.closeMessage();"></div>
    <div class="center">
      <div class="card">
        <div class="inner">
          <div class="icon_wrap">
            <img src="${escapeHtml(c.iconUrl)}" alt="" />
          </div>
          <div class="text_block">
            <div class="title">${escapeHtml(c.titleText)}</div>
            <div class="sub">${escapeHtml(c.subtitleText)}</div>
          </div>
          <button type="button" class="cta button_text">${escapeHtml(c.btnText)}</button>
        </div>
        <div class="bottom_wrapper">
          <button type="button" class="style01">${escapeHtml(c.bottomLeftText)}</button>
          <div style="display:flex;align-items:center;gap:${s(4)}px;">
            <button type="button" class="style02">${escapeHtml(c.bottomRightText)}</button>
            <span class="material-icons" style="font-size:${s(18)}px;color:${c.bottomColor}">close</span>
          </div>
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

      document.querySelector(".button_text").addEventListener("click", function() {
        try {
          ${c.enableLogClick ? `appboyBridge.logClick("${c.btnTracking}");` : ""}
          ${c.enableCustomEvent && c.customEventName ? `appboyBridge.logCustomEvent("${c.customEventName}");` : ""}
        } catch(e) {}
        window.location = deeplink;
      });

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

import { escapeHtml } from "../../components/ui/utils";
import {
  MODAL_MAX_WIDTH,
  MODAL_WIDTH_PERCENT,
  scaleDesignPx,
} from "../../constants/modalViewport.js";
import { collectSlideImageUrls } from "../figma-shared/slideImageKeys.js";

const s = scaleDesignPx;

const FALLBACK_IMG =
  "https://placehold.co/270x348/e2e8f0/94a3b8?text=Slide";

export function generateCode(c) {
  const sw = c.slideImageWidth ?? 270;
  const sh = c.slideImageHeight ?? 348;
  const gap = c.slideGap ?? 10;
  let urls = collectSlideImageUrls(c, { max: 3 }).map((u) => escapeHtml(u));
  if (urls.length === 0) urls = [escapeHtml(FALLBACK_IMG)];
  const slideCount = urls.length;
  const imgTags = urls.map((u) => `<img src="${u}" alt="" />`).join("\n            ");
  const padX = s(c.cardPaddingX ?? 20);
  const btnPad = s(20);
  const autoMs = c.slideAutoPlay ? (c.slideAutoPlayMs ?? 3000) : 0;

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
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    .card {
      background: ${c.cardBg ?? "#ffffff"};
      border-radius: ${s(14)}px;
      overflow: hidden;
      padding: ${s(c.cardPaddingTop ?? 14)}px ${padX}px ${s(c.cardPaddingBottom ?? 20)}px;
    }
    .slide_vp {
      width: 100%;
      margin: 0 auto;
      height: ${s(sh)}px;
      overflow: hidden;
      border-radius: ${s(c.slideRadius ?? 4)}px;
      position: relative;
      container-type: inline-size;
    }
    .slide_strip {
      display: flex;
      gap: ${s(gap)}px;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .slide_strip::-webkit-scrollbar { display: none; }
    .slide_strip img {
      width: min(${s(sw)}px, calc(100cqi - ${s(26)}px));
      flex: 0 0 min(${s(sw)}px, calc(100cqi - ${s(26)}px));
      height: ${s(sh)}px;
      object-fit: cover;
      flex-shrink: 0;
      scroll-snap-align: start;
      border-radius: ${s(c.slideRadius ?? 4)}px;
    }
    .pager {
      position: absolute;
      bottom: ${s(6)}px; right: ${s(6)}px;
      background: ${c.pagerBg ?? "rgba(0,0,0,0.8)"};
      border-radius: 100px;
      padding: ${s(3)}px ${s(8)}px;
      font-family: Arial, sans-serif;
      font-size: ${s(10)}px;
      color: #fff;
    }
    .pager .cur { color: #ffffff; }
    .pager .sep, .pager .tot { color: #828282; }
    .title {
      text-align: center;
      margin-top: ${s(10)}px;
      font-family: Inter, sans-serif;
      font-weight: 700;
      font-size: ${s(c.titleSize ?? 20) / 16}rem;
      color: ${c.titleColor ?? "#000"};
      line-height: 1.3;
    }
    .sub {
      text-align: center;
      margin-top: ${s(4)}px;
      font-family: Inter, sans-serif;
      font-size: ${s(c.subtitleSize ?? 13) / 16}rem;
      color: ${c.subtitleColor ?? "#000"};
      line-height: 1.45;
    }
    .cta_wrap {
      box-sizing: border-box;
      width: 100%;
      padding: ${btnPad}px;
    }
    .cta {
      box-sizing: border-box;
      width: 100%;
      height: ${s(c.btnHeight ?? 46)}px;
      border-radius: ${s(c.btnRadius ?? 4)}px;
      background: ${c.btnBgColor ?? "#00dc64"};
      color: ${c.btnColor ?? "#ffffff"};
      font-size: ${s(c.btnSize ?? 15) / 16}rem;
      font-weight: ${c.btnWeight ?? "700"};
    }
    .bottom_wrapper {
      display: flex; justify-content: space-between;
      align-items: center;
      margin-top: ${s(10)}px;
      padding: ${s(4)}px ${padX}px 0;
      padding-left: ${padX + s(2)}px;
      padding-right: ${padX + s(4)}px;
      background: transparent;
      box-sizing: border-box;
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
        <div class="slide_vp">
          <div class="slide_strip" id="slideStrip">
            ${imgTags}
          </div>
          <div class="pager" id="pager"><span class="cur">1</span><span class="sep"> / </span><span class="tot">${slideCount}</span></div>
        </div>
        <div class="title">${escapeHtml(c.titleText)}</div>
        <div class="sub">${escapeHtml(c.subtitleText)}</div>
        <div class="cta_wrap">
          <button type="button" class="cta button_text">${escapeHtml(c.btnText)}</button>
        </div>
      </div>
      <div class="bottom_wrapper">
        <button type="button" class="style01">${escapeHtml(c.bottomLeftText)}</button>
        <div style="display:flex;align-items:center;gap:${s(4)}px;">
          <button type="button" class="style02">${escapeHtml(c.bottomRightText)}</button>
          <span class="material-icons" style="font-size:${s(18)}px;color:${c.bottomColor}">close</span>
        </div>
      </div>
    </div>
    <div id="deeplink" style="display:none;">"${escapeHtml(c.deeplink)}"</div>
  </div>
  <script>
    (function() {
      var strip = document.getElementById("slideStrip");
      var pager = document.getElementById("pager");
      var imgs = strip.querySelectorAll("img");
      var n = imgs.length;
      var gapPx = ${s(gap)};
      var curEl = pager.querySelector(".cur");
      var totEl = pager.querySelector(".tot");
      function upd() {
        var scroll = strip.scrollLeft;
        var iw = imgs[0] ? imgs[0].offsetWidth + gapPx : 1;
        var i = Math.round(scroll / iw);
        if (i >= n) i = n - 1;
        if (i < 0) i = 0;
        if (curEl) curEl.textContent = String(i + 1);
        if (totEl) totEl.textContent = String(n);
      }
      strip.addEventListener("scroll", upd);
      setTimeout(upd, 100);
      ${autoMs > 0 ? `
      if (${autoMs} > 0 && n > 1) {
        setInterval(function() {
          var iw2 = imgs[0] ? imgs[0].offsetWidth + gapPx : 1;
          var scroll2 = strip.scrollLeft;
          var ci = Math.round(scroll2 / iw2);
          if (ci >= n) ci = n - 1;
          if (ci < 0) ci = 0;
          var nx = (ci + 1) % n;
          strip.scrollTo({ left: nx * iw2, behavior: "smooth" });
        }, ${autoMs});
      }` : ""}

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
    })();
  </script>
  <a href="appboy://close"></a>
</body>
</html>`;
}

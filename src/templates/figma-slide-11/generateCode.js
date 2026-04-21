import { escapeHtml } from "../../components/ui/utils";
import {
  MODAL_MAX_WIDTH,
  MODAL_WIDTH_PERCENT,
  scaleDesignPx,
} from "../../constants/modalViewport.js";
import { collectSlideImageUrls } from "../figma-shared/slideImageKeys.js";

const s = scaleDesignPx;

const FALLBACK_IMG =
  "https://placehold.co/600x600/e2e8f0/94a3b8?text=Slide";

export function generateCode(c) {
  const aw = c.imageAspectW ?? 339;
  const ah = c.imageAspectH ?? 342;
  const bottomSide = c.bottomSideMargin ?? 20;
  const mtBottom = s(8);
  const iconClose = s(20);
  const pb = Math.max(s(4), s(6));
  const pr = Math.max(s(4), s(6));
  let urls = collectSlideImageUrls(c).map((u) => escapeHtml(u));
  if (urls.length === 0) urls = [escapeHtml(FALLBACK_IMG)];
  const slideCount = urls.length;
  const imgTags = urls
    .map((u) => `<img class="hero_img" src="${u}" alt="" />`)
    .join("\n            ");
  const autoMs = c.slideAutoPlay ? (c.slideAutoPlayMs ?? 3000) : 0;

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
      aspect-ratio: ${aw} / ${ah};
      border-radius: ${s(c.imageRadius ?? 14)}px;
      overflow: hidden;
    }
    .slide_vp {
      position: absolute;
      inset: 0;
    }
    .slide_strip {
      display: flex;
      width: 100%;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .slide_strip .hero_img {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      scroll-snap-align: start;
    }
    .pager {
      position: absolute;
      bottom: ${pb}px; right: ${pr}px;
      background: ${c.pagerBg ?? "rgba(0,0,0,0.8)"};
      border-radius: 100px;
      padding: ${s(3)}px ${s(8)}px;
      font-family: Arial, sans-serif;
      font-size: ${s(11)}px;
      line-height: ${s(13)}px;
      display: flex;
      gap: ${s(2)}px;
      align-items: center;
    }
    .pager .cur { color: ${c.pagerTextActive ?? "#ffffff"}; }
    .pager .sep, .pager .tot { color: ${c.pagerTextMuted ?? "#828282"}; }
    .bottom_wrapper {
      display: flex; justify-content: space-between;
      align-items: center; margin-top: ${mtBottom}px;
      padding-left: ${s(bottomSide)}px; padding-right: ${s(bottomSide)}px;
    }
    .bottom_wrapper .style01 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      color: ${c.bottomColor};
      font-weight: 400; font-size: ${s(12) / 16}rem;
      font-family: Inter, sans-serif;
    }
    .bottom_wrapper .style02 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      text-align: right;
      color: ${c.bottomColor};
      font-weight: 400; font-size: ${s(12) / 16}rem;
      font-family: Inter, sans-serif;
    }
  </style>
</head>
<body>
  <div class="root">
    <div class="background" onclick="appboyBridge.logClick('background'); appboyBridge.closeMessage();"></div>
    <div class="center">
      <div class="hero_wrap">
        <div class="slide_vp">
          <div class="slide_strip" id="slideStrip">
            ${imgTags}
          </div>
        </div>
        <div class="pager" id="pager">
          <span class="cur">1</span><span class="sep">/</span><span class="tot">${slideCount}</span>
        </div>
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
    (function() {
      var strip = document.getElementById("slideStrip");
      var pager = document.getElementById("pager");
      if (!strip || !pager) return;
      var imgs = strip.querySelectorAll(".hero_img");
      var n = imgs.length;
      var gapPx = 0;
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
    })();

    document.addEventListener("DOMContentLoaded", function() {
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

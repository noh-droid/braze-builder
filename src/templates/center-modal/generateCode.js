import { escapeHtml } from "../../components/ui/utils";

export function generateCode(c) {
  return `<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; list-style: none; text-decoration: none; }
    html, body { height: 100%; overflow: hidden; font-size: 16px; }
    main { height: 100%; position: relative; }
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
      width: 310px; position: absolute; overflow: hidden;
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      display: flex; flex-direction: column;
    }
    .modal_wrapper {
      display: flex; flex-direction: column;
      padding: 8px 8px 0px 8px;
      border-radius: ${c.bgRadius}px;
      background: ${c.bgColor};
      ${c.bgImage ? `background-image: url(${c.bgImage}); background-repeat: no-repeat; background-size: cover; background-position: center;` : ""}
    }
    .image_wrapper {
      width: 100%; display: flex; justify-content: center;
    }
    .image_wrapper img {
      width: 295px; height: 295px;
      border-radius: ${c.imageRadius}px;
      object-fit: cover;
    }
    .contents_wrapper { width: 100%; }
    .contents_box { width: 100%; height: 100%; margin-top: 20px; }
    .contents_box .title {
      width: 100%; display: flex; align-items: center; margin-bottom: 7px;
    }
    .title .title_inner {
      width: 100%;
      text-align: ${c.titleAlign};
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      line-height: 1.4;
      color: ${c.titleColor};
      font-size: ${c.titleSize / 16}rem;
      font-weight: ${c.titleWeight};
      font-family: ${c.titleFont}, sans-serif;
    }
    .contents_box .sub_title {
      width: 100%; height: 100%;
      display: flex; align-items: center;
    }
    .sub_title .sub_title_inner {
      width: 100%;
      text-align: ${c.subAlign};
      text-overflow: ellipsis; overflow: hidden;
      line-height: 1.54;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      color: ${c.subColor};
      font-size: ${c.subSize / 16}rem;
      font-weight: ${c.subWeight};
      font-family: ${c.subFont}, sans-serif;
    }
    .btn_wrapper { width: 100%; margin: 16px 0px 20px 0px; display: flex; gap: ${(c.buttonCount ?? 2) === 2 ? "6px" : "0"}; }
    .btn_wrapper button {
      flex: 1; height: 48px;
      outline: 0; border: 0; padding: 0 16px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font-size: ${c.btnSize / 16}rem;
      font-weight: ${c.btnWeight};
      font-family: ${c.btnFont}, sans-serif;
      border-radius: ${c.btnRadius}px;
      cursor: pointer;
    }
    .btn_wrapper .button_text {
      color: ${c.btnColor};
      background-color: ${c.btnBgColor};
    }
    ${(c.buttonCount ?? 2) === 2 ? `
    .btn_wrapper .button_text2 {
      color: ${c.btn2Color || c.btnColor};
      background-color: ${c.btn2BgColor || c.btnBgColor};
    }
    ` : ""}
    .bottom_wrapper {
      display: flex; justify-content: space-between;
      align-items: center; margin-top: 11px;
    }
    .bottom_wrapper .style01 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      color: ${c.bottomColor};
      font-weight: 400; font-size: 0.875rem;
      font-family: ${c.titleFont}, sans-serif;
    }
    .bottom_wrapper .style02 {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      text-align: right;
      color: ${c.bottomColor};
      font-weight: 400; font-size: 0.875rem;
      font-family: ${c.titleFont}, sans-serif;
    }
  </style>
</head>
<body>
  <div class="root">
    <div class="background" onclick="appboyBridge.logClick('background'); appboyBridge.closeMessage();"></div>
    <div class="center">
      <div class="modal_wrapper">
        <div class="image_wrapper">
          <img src="${c.imageUrl}" alt="modal image" />
        </div>
        <div class="contents_wrapper">
          <div class="contents_box">
            <div class="title">
              <div class="title_inner">${escapeHtml(c.titleText)}</div>
            </div>
            <div class="sub_title">
              <div class="sub_title_inner">${escapeHtml(c.subText)}</div>
            </div>
          </div>
          ${(c.buttonCount ?? 2) !== 0 ? `
          <div class="btn_wrapper">
            <button class="button_text">${escapeHtml(c.btnText)}</button>
            ${(c.buttonCount ?? 2) === 2 ? `<button class="button_text2">${escapeHtml(c.btnText2 || "Close")}</button>` : ""}
          </div>
          ` : ""}
        </div>
      </div>
      <div class="bottom_wrapper">
        <button class="style01">${escapeHtml(c.bottomLeftText)}</button>
        <div style="display:flex;justify-content:center;align-items:center;">
          <button class="style02">${escapeHtml(c.bottomRightText)}</button>
          <span class="material-icons" style="font-size:20px;padding-bottom:1.6px;color:${c.bottomColor}">close</span>
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

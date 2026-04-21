import { makeNormalize } from "../figma-shared/makeNormalize.js";
import { collectSlideImageUrls } from "../figma-shared/slideImageKeys.js";

export const defaultConfig = {
  bgOpacity: 70,
  contentWidth: 339,
  imageAspectW: 339,
  imageAspectH: 342,
  imageUrl1: "/figma-modal-hero.jpg",
  imageUrl2: "/figma-modal-hero.jpg",
  imageUrl3: "",
  imageUrl4: "",
  imageUrl5: "",
  imageUrl6: "",
  imageRadius: 14,
  slideAutoPlay: false,
  slideAutoPlayMs: 3000,
  pagerBg: "rgba(0,0,0,0.8)",
  pagerTextActive: "#ffffff",
  pagerTextMuted: "#828282",
  deeplink: "https://yourapp.com/deeplink",
  bottomLeftText: "Don't show again",
  bottomRightText: "Close",
  bottomColor: "#ffffff",
  bottomSideMargin: 20,
  bottomLeftTracking: "never show",
  bottomRightTracking: "close",
  enableLogClick: true,
};

export function normalizeFigmaSlide11Config(input) {
  const raw = input || {};
  const merged = makeNormalize(defaultConfig)(raw);
  const hasSlotImages = collectSlideImageUrls(merged).length > 0;
  const legacy = raw.imageUrl && String(raw.imageUrl).trim();
  if (legacy && !hasSlotImages) {
    return { ...merged, imageUrl1: raw.imageUrl };
  }
  return merged;
}

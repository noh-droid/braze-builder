/** Braze 슬라이드 모달 공통: 최대 6장 이미지 URL 키 */
export const SLIDE_IMAGE_URL_KEYS = [
  "imageUrl1",
  "imageUrl2",
  "imageUrl3",
  "imageUrl4",
  "imageUrl5",
  "imageUrl6",
];

/**
 * @param {object} config
 * @param {{ max?: number }} [options] — max 기본값 6 (Slide 1:1 등). Vertical/Horizontal은 max: 3
 */
export function collectSlideImageUrls(config, options = {}) {
  const max = options.max ?? SLIDE_IMAGE_URL_KEYS.length;
  const keys = SLIDE_IMAGE_URL_KEYS.slice(0, max);
  return keys.map((k) => config[k]).filter(Boolean);
}

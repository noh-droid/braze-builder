/**
 * 모바일 가로 375px 기준, 모달 컬럼 339px(90.4%)에 맞춘 스케일.
 * 피그마 등에서 375 뷰포트 기준으로 적힌 px 값을 모달 구현 px로 변환할 때 사용.
 */
export const VIEWPORT_WIDTH = 375;
export const MODAL_MAX_WIDTH = 339;
/** 339 / 375 * 100 */
export const MODAL_WIDTH_PERCENT = 90.4;
export const MODAL_RATIO = MODAL_MAX_WIDTH / VIEWPORT_WIDTH;

export function scaleDesignPx(px) {
  if (px == null || Number.isNaN(Number(px))) return 0;
  return Math.round(Number(px) * MODAL_RATIO * 100) / 100;
}

export function scaleDesignPxInt(px) {
  return Math.round(scaleDesignPx(px));
}

/** 모달 전체 너비(339에 해당)로 취급할지 — 스케일 없이 100% 너비 */
export function isFullModalWidth(px) {
  const n = Number(px);
  if (Number.isNaN(n)) return true;
  return n >= MODAL_MAX_WIDTH - 1;
}

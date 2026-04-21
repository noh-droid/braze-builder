/**
 * 빌더 프리뷰 하단 풋노트 행( flex 래퍼 ) 패딩: top 10px, right 4px, bottom 10px, left 2px.
 */
export const modalPreviewBottomFootRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 4px 10px 2px",
  boxSizing: "border-box",
};

/**
 * 빌더 프리뷰 하단 풋노트(예: Don't show again / Close ✕) — 스케일 없이 14px, 좌우 패딩 4px.
 */
export function modalPreviewBottomFootLeftStyle(color, fontFamily) {
  return {
    color,
    fontFamily,
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "left",
    paddingLeft: "4px",
    paddingRight: "4px",
  };
}

export function modalPreviewBottomFootRightStyle(color, fontFamily) {
  return {
    ...modalPreviewBottomFootLeftStyle(color, fontFamily),
    display: "flex",
    alignItems: "center",
    gap: "2px",
  };
}

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * scroll-snap 가로 스트립용: 스크롤 위치로 인덱스 동기화, 자동 슬라이드, scrollTo
 * Braze HTML과 동일하게 overflow + scroll 기반 (외부 라이브러리 없음)
 */
export function useSlideStripCarousel({
  slideCount,
  gapPx,
  autoPlay,
  autoPlayMs = 3000,
}) {
  const stripRef = useRef(null);
  const [index, setIndex] = useState(0);

  const getStep = useCallback(() => {
    const el = stripRef.current;
    if (!el) return 0;
    const img = el.querySelector("img");
    if (!img) return 0;
    return img.offsetWidth + gapPx;
  }, [gapPx]);

  const updateFromScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el || slideCount < 1) return;
    const step = getStep();
    if (!step) return;
    let i = Math.round(el.scrollLeft / step);
    if (i >= slideCount) i = slideCount - 1;
    if (i < 0) i = 0;
    setIndex(i);
  }, [slideCount, getStep]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => updateFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateFromScroll());
    ro.observe(el);
    const t = requestAnimationFrame(() => updateFromScroll());
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(t);
    };
  }, [updateFromScroll, slideCount]);

  const scrollToIndex = useCallback(
    (i) => {
      const el = stripRef.current;
      if (!el) return;
      const step = getStep();
      if (!step) return;
      const clamped = Math.max(0, Math.min(slideCount - 1, i));
      el.scrollTo({ left: clamped * step, behavior: "smooth" });
    },
    [getStep, slideCount],
  );

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) return;
    const id = setInterval(() => {
      const el = stripRef.current;
      if (!el) return;
      const step = getStep();
      if (!step) return;
      const scroll2 = el.scrollLeft;
      let ci = Math.round(scroll2 / step);
      if (ci >= slideCount) ci = slideCount - 1;
      if (ci < 0) ci = 0;
      const nx = (ci + 1) % slideCount;
      el.scrollTo({ left: nx * step, behavior: "smooth" });
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayMs, slideCount, getStep]);

  const safeIndex = Math.min(
    Math.max(0, index),
    Math.max(0, slideCount - 1),
  );

  return { stripRef, index: safeIndex, scrollToIndex };
}

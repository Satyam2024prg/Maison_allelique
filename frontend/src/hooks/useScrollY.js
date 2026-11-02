import { useEffect, useState } from "react";

/**
 * Cheap scroll hook — reads scrollY, throttled via rAF.
 * Returns 0 when prefers-reduced-motion is set (per brief).
 */
export const useScrollY = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setY(0);
      return undefined;
    }
    let rafId = 0;
    let latest = window.scrollY;
    const onScroll = () => {
      latest = window.scrollY;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        setY(latest);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return y;
};

export default useScrollY;

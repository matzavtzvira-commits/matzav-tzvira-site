"use client";
import { useEffect, useRef } from "react";

interface LazyVideoProps {
  src: string;
  style?: React.CSSProperties;
  rootMargin?: string;
}

export function LazyVideo({ src, style, rootMargin = "400px 0px" }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = src;
          el.load();
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src, rootMargin]);

  return <video ref={ref} autoPlay loop muted playsInline style={style} />;
}

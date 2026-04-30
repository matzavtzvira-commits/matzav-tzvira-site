"use client";
import { useEffect, useState } from "react";

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("splashSeen")) return;
    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splashSeen", "1");
    }, 3700);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a1a6e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: fading ? "splashFadeOut 0.5s ease forwards" : undefined,
      }}
    >
      <img
        src="/logo-animated.gif"
        alt="מצב צבירה"
        style={{
          width: "min(340px, 80vw)",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

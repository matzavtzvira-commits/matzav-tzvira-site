"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedUnderline({ color = "#FA5C5C", delay = 0.5 }: { color?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.span
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{
        display: "block",
        height: 3,
        background: color,
        borderRadius: 2,
        marginTop: 6,
        transformOrigin: "right",
      }}
    />
  );
}

const brushMap: Record<string, string> = {
  "#FA5C5C": "/brush-red.svg",
  "#124AF0": "/brush-blue.svg",
  "#21F0B0": "/brush-green.svg",
  "#070C24": "/brush-dark.svg",
};

function BrushBtn({
  href,
  onClick,
  children,
  color = "#FA5C5C",
  textColor = "white",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  color?: string;
  textColor?: string;
}) {
  const brush = brushMap[color] ?? "/brush-red.svg";
  const inner = (
    <span style={{ position: "relative", display: "inline-block" }}>
      <img
        src={`${brush}?v=4`}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: "-8px -12px",
          width: "calc(100% + 24px)",
          height: "calc(100% + 16px)",
          pointerEvents: "none",
          userSelect: "none",
          background: "transparent",
        }}
      />
      <span
        style={{
          position: "relative",
          display: "block",
          color: textColor,
          fontWeight: 700,
          fontSize: "1.05rem",
          padding: "16px 40px",
          borderRadius: 50,
          textAlign: "center",
          textDecoration: "none",
          cursor: "pointer",
          transition: "transform 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        {children}
      </span>
    </span>
  );
  return (
    <span onClick={onClick} style={{ display: "inline-block" }}>
      {href ? <a href={href} style={{ textDecoration: "none" }}>{inner}</a> : inner}
    </span>
  );
}

export default function VipPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 160, direction: "rtl" }}>

        {/* ───── סקשן 1: Hero ───── */}
        <section style={{
          background: "linear-gradient(160deg, #070C24 0%, #0a1a6e 55%, #124AF0 100%)",
          padding: "100px 1.5rem 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* blobs */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(33,240,176,0.07)", filter: "blur(90px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 340, height: 340, borderRadius: "50%", background: "rgba(250,92,92,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>

            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-block",
                background: "#FA5C5C",
                color: "white",
                borderRadius: 50,
                padding: "6px 20px",
                fontSize: "0.82rem",
                fontWeight: 700,
                marginBottom: 28,
                letterSpacing: 0.5,
              }}
            >
              השירות היחיד בארץ שעושה את הכל עבורך
            </motion.span>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              style={{
                fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
                color: "white",
                fontWeight: 900,
                lineHeight: 1.25,
                marginBottom: 6,
                textShadow: "0 0 40px rgba(255,255,255,0.12)",
              }}
            >
              תשכחי מייעוץ שמשאיר אותך עם שיעורי בית
              <br />
              <span style={{ color: "#21F0B0" }}>אני פשוט עושה את הכל במקומך</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <AnimatedUnderline color="#FA5C5C" delay={0.6} />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 2,
                maxWidth: 640,
                margin: "28px auto 40px",
              }}
            >
              ליווי פיננסי אישי עם רבקי וייס <span style={{ fontSize: "0.75em" }}>-</span> שבו אני לא מחלקת עצות
              ושולחת אותך לריב עם הבירוקרטיה לבד.
              <br />
              אני מבצעת: מאחדת קופות, מוזילה דמי ניהול, פותחת תיק השקעות.
              <br />
              את מקבלת שורה תחתונה אחת<span style={{ fontSize: "0.75em" }}> - </span>
              <strong style={{ color: "white" }}>כסף שעובד.</strong>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BrushBtn href="#contact-form" color="#FA5C5C" textColor="white">
                כן, אני רוצה שתכנסי לנעליים שלי ←
              </BrushBtn>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginTop: 16 }}>
                ללא התחייבות <span style={{ fontSize: "0.75em" }}>-</span> פגישת היכרות קצרה, בלי לחץ
              </p>
            </motion.div>

          </div>
        </section>

        {/* ───── סקשנים 2–10: בקרוב ───── */}

      </main>
      <Footer />
    </>
  );
}

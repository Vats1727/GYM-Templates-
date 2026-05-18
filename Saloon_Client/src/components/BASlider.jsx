import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";
import { T } from "../constants/data";

export default function BASlider({ work, theme }) {
  const c = T[theme];
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  const move = useCallback((clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  }, []);

  useEffect(() => {
    const up = () => setDragging(false);
    const mv = (e) => { if (dragging) move(e.touches ? e.touches[0].clientX : e.clientX); };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchend", up);
    window.addEventListener("touchmove", mv);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("mousemove", mv); window.removeEventListener("touchend", up); window.removeEventListener("touchmove", mv); };
  }, [dragging, move]);

  return (
    <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, overflow: "hidden" }}>
      <div
        ref={ref}
        style={{ position: "relative", height: 220, cursor: "ew-resize", userSelect: "none", overflow: "hidden" }}
        onMouseDown={(e) => { setDragging(true); move(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); move(e.touches[0].clientX); }}
      >
        <div style={{ position: "absolute", inset: 0, background: work.beforeBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ fontSize: 36 }}>{work.emoji}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>Before</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", textAlign: "center", padding: "0 20px" }}>{work.beforeDesc}</div>
        </div>
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${pos}%)`, background: work.afterBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ fontSize: 36 }}>{work.emoji}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>After</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", textAlign: "center", padding: "0 20px" }}>{work.afterDesc}</div>
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", width: 2, background: "rgba(255,255,255,0.9)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "2px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.3)", color: "#333" }}>
            <ArrowLeftRight size={14} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(0,0,0,0.5)", color: "#fff", padding: "3px 8px", borderRadius: 20 }}>Before</div>
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(255,255,255,0.2)", color: "#fff", padding: "3px 8px", borderRadius: 20 }}>After</div>
      </div>
      <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{work.tag}</div>
          <div style={{ fontSize: 11, color: c.textMuted }}>by {work.artist} · {work.time}</div>
        </div>
        <div style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: c.tag, color: c.tagText, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{work.type}</div>
      </div>
    </div>
  );
}

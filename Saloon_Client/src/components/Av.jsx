export default function Av({ init, col, size = 52 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: col + "20", border: `1.5px solid ${col}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontWeight: 600, fontSize: size * 0.28, color: col, flexShrink: 0 }}>
      {init}
    </div>
  );
}

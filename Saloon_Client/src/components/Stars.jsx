import { Star } from "lucide-react";

export default function Stars({ n = 5, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "#F4B740" }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} fill="#F4B740" strokeWidth={0} />
      ))}
    </span>
  );
}

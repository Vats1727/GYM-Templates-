import React from "react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Stats() {
  const defaultStats = [
    { num: "2,400", suf: "+", label: "Active Members" },
    { num: "48", suf: "+", label: "Weekly Classes" },
    { num: "12", suf: "", label: "Elite Trainers" },
    { num: "98", suf: "%", label: "Member Retention" }
  ];

  const { data: dbStats } = useFetchData('stats/active', []);

  if (!dbStats || dbStats.length === 0) return null;

  const stats = dbStats;

  return (
    <div className="stats-band" style={{ position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/stats" />
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-item fade-in" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-big">
              {s.num}<span>{s.suf}</span>
            </div>
            <div className="stat-desc">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

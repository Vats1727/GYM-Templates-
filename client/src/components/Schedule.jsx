import React, { useState } from "react";
import { SCHEDULE } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Schedule({ hover, unhover }) {
  const [activeDay, setActiveDay] = useState("Mon");
  const { data: sectionHeadings } = useFetchData('schedule_section/active', []);
  const { data: dbSchedule } = useFetchData('schedule/active', []);
  
  // Reconstruct grouping map from flat database schedule array
  const activeSchedule = React.useMemo(() => {
    if (!Array.isArray(dbSchedule) || dbSchedule.length === 0) return SCHEDULE;
    const mapped = { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] };
    dbSchedule.forEach(item => {
      const day = item.day || 'Mon';
      if (mapped[day]) {
        mapped[day].push({
          ...item,
          spots: parseInt(item.spots) || 0
        });
      }
    });
    return mapped;
  }, [dbSchedule]);

  if (!sectionHeadings || sectionHeadings.length === 0) return null;
  
  const sectionHead = sectionHeadings[0];

  const tagCls = t =>
    ({
      HIIT: "tag-hiit",
      Yoga: "tag-yoga",
      Strength: "tag-strength",
      Cardio: "tag-cardio",
      Boxing: "tag-boxing"
    }[t] || "tag-hiit");

  return (
    <section className="schedule" id="schedule">
      <VisualEditorTrigger sectionPath="/admin/schedule" />
      <div className="schedule-header">
        <div>
          <div className="section-label fade-in">{sectionHead.tag}</div>
          <h2 className="section-title fade-in">
            {sectionHead.title ? sectionHead.title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>{line}{idx < sectionHead.title.split('\n').length - 1 && <br />}</React.Fragment>
            )) : "WEEKLY SCHEDULE"}
          </h2>
        </div>
        <p className="section-sub fade-in">{sectionHead.desc}</p>
      </div>
      <div className="day-tabs fade-in">
        {["Mon", "Tue", "Wed"].map(d => (
          <button
            key={d}
            className={`day-tab${activeDay === d ? " active" : ""}`}
            onClick={() => setActiveDay(d)}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            {d}
          </button>
        ))}
        {["Thu", "Fri", "Sat", "Sun"].map(d => (
          <button key={d} className="day-tab" style={{ opacity: 0.35 }} disabled>
            {d}
          </button>
        ))}
      </div>
      <table className="schedule-table fade-in">
        <thead>
          <tr>
            <th>Time</th>
            <th>Class</th>
            <th>Trainer</th>
            <th>Duration</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(activeSchedule[activeDay] || []).map((cls, i) => (
            <tr key={i}>
              <td
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 16,
                  letterSpacing: 1,
                  color: "var(--accent)"
                }}
              >
                {cls.time}
              </td>
              <td>
                <div className="class-name">{cls.name}</div>
                <span className={`class-tag ${tagCls(cls.type)}`}>{cls.type}</span>
              </td>
              <td style={{ color: "var(--muted)" }}>{cls.trainer}</td>
              <td style={{ color: "var(--muted)" }}>{cls.duration}</td>
              <td>
                <div className="spots-bar">
                  <div className="spots-track">
                    <div className="spots-fill" style={{ width: `${cls.spots}%` }} />
                  </div>
                  <span className="spots-text">
                    {cls.spots < 30 ? "Few spots" : cls.spots > 85 ? "Open" : `${cls.spots}%`}
                  </span>
                </div>
              </td>
              <td>
                <button
                  className="btn-ghost"
                  style={{ padding: "8px 20px", fontSize: 11 }}
                  onMouseEnter={hover}
                  onMouseLeave={unhover}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

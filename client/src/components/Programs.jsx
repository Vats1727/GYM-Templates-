import React from "react";
import { PROGRAMS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

import { renderDynamicIcon } from "../utils/IconRenderer";

export default function Programs({ hover, unhover }) {
  const { data: sectionHeadings } = useFetchData('programs_section/active', []);
  const { data: programsList } = useFetchData('programs/active', []);
  
  if (!sectionHeadings || sectionHeadings.length === 0) return null;
  
  const programs = Array.isArray(programsList) && programsList.length > 0 ? programsList : [];
  const sectionHead = sectionHeadings[0];

  return (
    <section className="programs" id="programs">
      <VisualEditorTrigger sectionPath="/admin/programs" />
      <div className="programs-header">
        <div>
          <div className="section-label fade-in">{sectionHead.tag}</div>
          <h2 className="section-title fade-in">
            {sectionHead.title ? sectionHead.title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>{line}{idx < sectionHead.title.split('\n').length - 1 && <br />}</React.Fragment>
            )) : "TRAINING PROGRAMS"}
          </h2>
        </div>
        <p className="section-sub fade-in" style={{ textAlign: "right" }}>
          {sectionHead.desc}
        </p>
      </div>
      <div className="programs-grid">
        {programs.map((p, i) => (
          <div
            key={i}
            className={`program-card fade-in${p.featured ? " featured" : ""}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            <div className="prog-num">{p.num}</div>
            <div className="prog-icon" style={{ display: 'flex' }}>{renderDynamicIcon(p.icon, 28)}</div>
            <div className="prog-tag">{p.tag}</div>
            <div className="prog-name">{p.name}</div>
            <p className="prog-desc">{p.desc}</p>
            <div className="prog-arrow">↗</div>
          </div>
        ))}
      </div>
    </section>
  );
}

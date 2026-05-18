import React from "react";
import { TRAINERS } from "../constants/data";

import useFetchData from "../hooks/useFetchData";
import { renderDynamicIcon } from "../utils/IconRenderer";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Trainers({ hover, unhover }) {
  const { data: sectionHeadings } = useFetchData('trainers_section/active', []);
  const { data: trainersList } = useFetchData('trainers/active', []);
  
  if (!sectionHeadings || sectionHeadings.length === 0) return null;
  
  const trainers = Array.isArray(trainersList) && trainersList.length > 0 ? trainersList : [];
  const sectionHead = sectionHeadings[0];

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || '/gym_v1/server/public';
    return `${baseUrl}/${path}`;
  };

  return (
    <section className="trainers" id="trainers">
      <VisualEditorTrigger sectionPath="/admin/trainers" />
      <div className="trainers-header">
        <div className="section-label fade-in">{sectionHead.tag}</div>
        <h2 className="section-title fade-in">
          {sectionHead.title ? sectionHead.title.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>{line}{idx < sectionHead.title.split('\n').length - 1 && <br />}</React.Fragment>
          )) : "MEET THE COACHES"}
        </h2>
      </div>
      <div className="trainers-grid">
        {trainers.map((t, i) => (
          <div
            key={i}
            className={`trainer-card ${t.color} fade-in`}
            style={{ transitionDelay: `${i * 0.1}s`, position: 'relative', overflow: 'hidden' }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            {t.image ? (
              <>
                <img 
                  src={getImageUrl(t.image)} 
                  alt={t.name} 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    zIndex: 0,
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
                  zIndex: 1
                }} />
              </>
            ) : (
              <div className="trainer-placeholder" style={{ fontSize: 64, display: 'flex', opacity: 0.1, zIndex: 0 }}>
                {renderDynamicIcon(t.icon || 'User', 80)}
              </div>
            )}
            <div className="trainer-name-static" style={{ position: 'relative', zIndex: 2 }}>
              <div className="trainer-name">{t.name}</div>
              <div className="trainer-role">{t.role}</div>
            </div>
            <div className="trainer-info" style={{ position: 'relative', zIndex: 2 }}>
              <div className="trainer-number">Coach {t.num}</div>
              <div className="trainer-name">{t.name}</div>
              <div className="trainer-role">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

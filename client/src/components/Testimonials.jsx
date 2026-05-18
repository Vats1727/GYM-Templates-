import React from "react";
import { TESTIMONIALS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Testimonials({ hover, unhover }) {
  const { data: sectionHeadings } = useFetchData('testimonials_section/active', []);
  const { data: testimonialsList } = useFetchData('testimonials/active', []);
  
  if (!sectionHeadings || sectionHeadings.length === 0) return null;
  
  const sectionHead = sectionHeadings[0];

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || '/gym_v1/server/public';
    return `${baseUrl}/${path}`;
  };

  return (
    <section className="testimonials" id="testimonials">
      <VisualEditorTrigger sectionPath="/admin/testimonials" />
      <div className="testimonials-header">
        <div className="section-label fade-in">{sectionHead.tag}</div>
        <h2 className="section-title fade-in">
          {sectionHead.title ? sectionHead.title.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>{line}{idx < sectionHead.title.split('\n').length - 1 && <br />}</React.Fragment>
          )) : "MEMBER STORIES"}
        </h2>
      </div>
      <div className="testimonials-grid">
        {(Array.isArray(testimonialsList) ? testimonialsList : []).map((t, i) => (
          <div
            key={i}
            className="testi-card fade-in"
            style={{ transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            <div className="testi-quote">"</div>
            <p className="testi-text">"{t.quote}"</p>
            <div className="testi-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="testi-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: '#1e293b' }}>
                  {t.avatar && (t.avatar.includes('/') || t.avatar.startsWith('upload')) ? (
                    <img 
                      src={getImageUrl(t.avatar)} 
                      alt={t.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span style={{ fontSize: '20px' }}>{t.avatar || "👤"}</span>
                  )}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-detail">{t.detail}</div>
                </div>
              </div>
              <div className="testi-stars" style={{ display: 'flex', gap: '2px', color: '#ffc107' }}>
                {Array.from({ length: Number(t.stars) || 0 }).map((_, j) => (
                  <span key={j} className="star" style={{ fontSize: '14px' }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

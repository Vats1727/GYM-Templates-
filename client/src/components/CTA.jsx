import React from "react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function CTA({ hover, unhover }) {
  const { data: ctaList } = useFetchData('cta_section/active', []);

  if (!ctaList || ctaList.length === 0) return null;
  
  const ctaData = ctaList[0] || {
    tag: 'Start Today',
    title_line1: 'NO MORE',
    title_line2: 'WAITING',
    title_line3: 'FOR CHANGE',
    subtitle: 'Your first week is on us. Walk in, train hard, and decide if you belong here.',
    btn1_text: 'Claim Free Trial',
    btn2_text: 'View Schedule'
  };

  return (
    <section className="cta-section" id="join">
      <VisualEditorTrigger sectionPath="/admin/cta_section" />
      <div className="cta-bg" />
      {ctaData.tag && (
        <div className="section-label fade-in" style={{ marginBottom: 24 }}>
          {ctaData.tag}
        </div>
      )}
      <h2 className="cta-title fade-in">
        {ctaData.title_line1 && <>{ctaData.title_line1}<br /></>}
        {ctaData.title_line2 && <><span className="stroke">{ctaData.title_line2}</span><br /></>}
        {ctaData.title_line3 && <>{ctaData.title_line3}</>}
      </h2>
      {ctaData.subtitle && (
        <p className="cta-sub fade-in">
          {ctaData.subtitle}
        </p>
      )}
      <div className="cta-actions fade-in">
        {ctaData.btn1_text && (
          <a href="#pricing" className="btn-primary" onMouseEnter={hover} onMouseLeave={unhover}>
            {ctaData.btn1_text}
          </a>
        )}
        {ctaData.btn2_text && (
          <a href="#schedule" className="btn-ghost" onMouseEnter={hover} onMouseLeave={unhover}>
            {ctaData.btn2_text}
          </a>
        )}
      </div>
    </section>
  );
}

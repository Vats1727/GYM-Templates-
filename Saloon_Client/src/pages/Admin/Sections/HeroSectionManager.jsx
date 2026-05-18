import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HeroSectionManager() {
  const fields = [
    {
      "key": "tag",
      "label": "Tagline Accent (e.g. HAIR • MAKEUP • SKIN • NAILS)",
      "type": "text"
    },
    {
      "key": "title_line1",
      "label": "Title Line 1 (e.g. BEAUTY & ELEGANCE)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g. REDEFINED)",
      "type": "text"
    },
    {
      "key": "btn_text",
      "label": "Primary Booking Button (e.g. Reserve Spot)",
      "type": "text"
    },
    {
      "key": "btn_subtext",
      "label": "Button Small Helper (e.g. takes 2 minutes)",
      "type": "text"
    },
    {
      "key": "stat1_val",
      "label": "Stat 1 Value (e.g. 12k+)",
      "type": "text"
    },
    {
      "key": "stat1_lbl",
      "label": "Stat 1 Label (e.g. Happy Clients)",
      "type": "text"
    },
    {
      "key": "stat2_val",
      "label": "Stat 2 Value (e.g. 99.8%)",
      "type": "text"
    },
    {
      "key": "stat2_lbl",
      "label": "Stat 2 Label (e.g. Satisfaction)",
      "type": "text"
    },
    {
      "key": "stat3_val",
      "label": "Stat 3 Value (e.g. 15+)",
      "type": "text"
    },
    {
      "key": "stat3_lbl",
      "label": "Stat 3 Label (e.g. Top Stylists)",
      "type": "text"
    },
    {
      "key": "image",
      "label": "Hero Background Image",
      "type": "image"
    }
  ];

  return (
    <GenericManager 
      title="Hero Section Manager" 
      tableKey="hero_section" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

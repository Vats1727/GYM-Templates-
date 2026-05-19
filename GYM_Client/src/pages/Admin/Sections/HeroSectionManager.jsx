import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HeroSectionManager() {
  const fields = [
    {
      "key": "image",
      "label": "Trainer Profile Image (Leave blank to use default)",
      "type": "image"
    },
    {
      "key": "tag",
      "label": "Hero Tagline Accent",
      "type": "text"
    },
    {
      "key": "title_line1",
      "label": "Title Line 1 (e.g., BUILD)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g., YOUR)",
      "type": "text"
    },
    {
      "key": "title_line3",
      "label": "Title Line 3 (e.g., BEST)",
      "type": "text"
    },
    {
      "key": "title_line4",
      "label": "Title Line 4 (e.g., BODY)",
      "type": "text"
    },
    {
      "key": "tagline",
      "label": "Focus disciplines tagline",
      "type": "textarea"
    },
    {
      "key": "stat1_val",
      "label": "Stat 1 Value (e.g., 500+)",
      "type": "text"
    },
    {
      "key": "stat1_lbl",
      "label": "Stat 1 Label (e.g., Clients Transformed)",
      "type": "text"
    },
    {
      "key": "stat2_val",
      "label": "Stat 2 Value (e.g., 10yr)",
      "type": "text"
    },
    {
      "key": "stat2_lbl",
      "label": "Stat 2 Label (e.g., Experience)",
      "type": "text"
    },
    {
      "key": "stat3_val",
      "label": "Stat 3 Value (e.g., 98%)",
      "type": "text"
    },
    {
      "key": "stat3_lbl",
      "label": "Stat 3 Label (e.g., Goal Achievement)",
      "type": "text"
    },
    {
      "key": "btn_text",
      "label": "Primary Booking Button Text",
      "type": "text"
    },
    {
      "key": "btn2_text",
      "label": "Secondary Button Text",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Hero Section Settings" 
      tableKey="hero_section" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

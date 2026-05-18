import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HeroSectionManager() {
  const fields = [
    {
      "key": "tag",
      "label": "Tagline (e.g. Now Accepting Members)",
      "type": "text"
    },
    {
      "key": "title_line1",
      "label": "Title Line 1 (e.g. FORGE YOUR)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g. BEST)",
      "type": "text"
    },
    {
      "key": "title_line3",
      "label": "Title Line 3 (e.g. BODY)",
      "type": "text"
    },
    {
      "key": "btn1_text",
      "label": "Primary Button Text (e.g. Start free trial)",
      "type": "text"
    },
    {
      "key": "btn2_text",
      "label": "Secondary Button Text (e.g. Explore Programs)",
      "type": "text"
    },
    {
      "key": "subtitle",
      "label": "Hero Subtitle Description",
      "type": "textarea"
    },
    {
      "key": "stat1_val",
      "label": "Stat 1 Value (e.g. 2.4K+)",
      "type": "text"
    },
    {
      "key": "stat1_lbl",
      "label": "Stat 1 Label (e.g. Active Members)",
      "type": "text"
    },
    {
      "key": "stat2_val",
      "label": "Stat 2 Value (e.g. 98%)",
      "type": "text"
    },
    {
      "key": "stat2_lbl",
      "label": "Stat 2 Label (e.g. Satisfaction Rate)",
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

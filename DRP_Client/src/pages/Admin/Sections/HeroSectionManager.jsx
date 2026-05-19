import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HeroSectionManager() {
  const fields = [
    {
      "key": "image",
      "label": "Hero Profile Image (Leave blank to use vector avatar)",
      "type": "image"
    },
    {
      "key": "tag",
      "label": "Tagline Accent (e.g. Online Consultations Available)",
      "type": "text"
    },
    {
      "key": "title_line1",
      "label": "Title Line 1 (e.g. Heal Naturally with)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g. Dr. Aisha Malik)",
      "type": "text"
    },
    {
      "key": "subtitle",
      "label": "Credentials / Subtitle (e.g. BHMS · Hijama Therapist)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Main Hero Description",
      "type": "textarea"
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
    },
    {
      "key": "stat1_val",
      "label": "Stat 1 Value (e.g. 12+)",
      "type": "text"
    },
    {
      "key": "stat1_lbl",
      "label": "Stat 1 Label (e.g. Years Experience)",
      "type": "text"
    },
    {
      "key": "stat2_val",
      "label": "Stat 2 Value (e.g. 3k+)",
      "type": "text"
    },
    {
      "key": "stat2_lbl",
      "label": "Stat 2 Label (e.g. Patients Treated)",
      "type": "text"
    },
    {
      "key": "stat3_val",
      "label": "Stat 3 Value (e.g. 95%)",
      "type": "text"
    },
    {
      "key": "stat3_lbl",
      "label": "Stat 3 Label (e.g. Satisfaction Rate)",
      "type": "text"
    },
    {
      "key": "badge1_title",
      "label": "Badge 1 Title (e.g. Certified in)",
      "type": "text"
    },
    {
      "key": "badge1_value",
      "label": "Badge 1 Value (e.g. Homoeopathy)",
      "type": "text"
    },
    {
      "key": "badge2_title",
      "label": "Badge 2 Title (e.g. Next slot)",
      "type": "text"
    },
    {
      "key": "badge2_value",
      "label": "Badge 2 Value (e.g. Today 4:00 PM)",
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

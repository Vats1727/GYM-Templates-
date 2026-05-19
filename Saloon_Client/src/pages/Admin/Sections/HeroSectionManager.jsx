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
      "label": "Title Line 1 (e.g. Beauty is)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g. a practice,)",
      "type": "text"
    },
    {
      "key": "title_line3",
      "label": "Title Line 3 (e.g. not an event.)",
      "type": "text"
    },
    {
      "key": "subtitle",
      "label": "Hero Description Text",
      "type": "textarea"
    },
    {
      "key": "btn_text",
      "label": "Primary Button Text (e.g. Reserve Your Visit →)",
      "type": "text"
    },
    {
      "key": "btn_link",
      "label": "Primary Button Target (e.g. book)",
      "type": "text"
    },
    {
      "key": "btn2_text",
      "label": "Secondary Button Text (e.g. See Transformations)",
      "type": "text"
    },
    {
      "key": "btn2_link",
      "label": "Secondary Button Target (e.g. work)",
      "type": "text"
    },
    {
      "key": "image",
      "label": "Hero Background Image",
      "type": "image"
    },
    {
      "key": "rating_stars",
      "label": "Press Strip Rating (1-5 Stars)",
      "type": "number"
    },
    {
      "key": "featured_in",
      "label": "Press Strip Featured Text",
      "type": "text"
    },
    {
      "key": "award_title",
      "label": "Showcase Award Title",
      "type": "text"
    },
    {
      "key": "award_subtitle",
      "label": "Showcase Award Subtitle",
      "type": "text"
    },
    {
      "key": "quick_book_title",
      "label": "Quick Book Card Title",
      "type": "text"
    },
    {
      "key": "quick_book_subtitle",
      "label": "Quick Book Card Subtitle",
      "type": "text"
    },
    {
      "key": "quick_book_btn_text",
      "label": "Quick Book Button Text",
      "type": "text"
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

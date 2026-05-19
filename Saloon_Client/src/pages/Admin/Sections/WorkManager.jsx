import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function WorkManager() {
  const fields = [
    {
      "key": "title",
      "label": "Work Portfolio Title (e.g. Signature Blonde Balayage)",
      "type": "text"
    },
    {
      "key": "type",
      "label": "Category / Filter Group",
      "type": "select",
      "options": ["Color", "Cut", "Grooming", "Beauty", "Shave"]
    },
    {
      "key": "artist",
      "label": "Stylist / Artist Name",
      "type": "text"
    },
    {
      "key": "time",
      "label": "Duration (e.g. 3.5 hrs)",
      "type": "text"
    },
    {
      "key": "emoji",
      "label": "Category Emoji (e.g. 💇‍♀️, ✂️, 🎨, 🪒)",
      "type": "text"
    },
    {
      "key": "before_image",
      "label": "Before Image (Optional)",
      "type": "image"
    },
    {
      "key": "after_image",
      "label": "After Image (Optional)",
      "type": "image"
    },
    {
      "key": "beforeDesc",
      "label": "Before Description (e.g. Faded color & split ends)",
      "type": "text"
    },
    {
      "key": "afterDesc",
      "label": "After Description (e.g. Vibrant honey balayage & cut)",
      "type": "text"
    },
    {
      "key": "beforeBg",
      "label": "Before Background Color (if no image, e.g. #2A2020)",
      "type": "text"
    },
    {
      "key": "afterBg",
      "label": "After Background Color (if no image, e.g. #3b2c2c)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Before/After Portfolio Manager" 
      tableKey="work" 
      headingSlug="work_heading"
      fields={fields} 
    />
  );
}

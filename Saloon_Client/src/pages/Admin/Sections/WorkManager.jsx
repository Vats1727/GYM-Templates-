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
      "key": "desc",
      "label": "Work Description / Stylist Name (e.g. Color correction by Alexandra)",
      "type": "text"
    },
    {
      "key": "before_image",
      "label": "Before Image",
      "type": "image"
    },
    {
      "key": "after_image",
      "label": "After Image",
      "type": "image"
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

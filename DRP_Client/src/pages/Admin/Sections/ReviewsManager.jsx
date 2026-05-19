import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ReviewsManager() {
  const fields = [
    {
      "key": "name",
      "label": "Patient Name (e.g. Fatima M.)",
      "type": "text"
    },
    {
      "key": "initials",
      "label": "Patient Initials (e.g. FM)",
      "type": "text"
    },
    {
      "key": "role",
      "label": "Verification/Description (e.g. Dubai · PCOS Patient)",
      "type": "text"
    },
    {
      "key": "text",
      "label": "Patient Review Text",
      "type": "textarea"
    },
    {
      "key": "stars",
      "label": "Rating Stars Score",
      "type": "stars"
    },
    {
      "key": "avatarGradient",
      "label": "Avatar Gradient CSS (e.g. linear-gradient(135deg, var(--accent), var(--gold)))",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Patient Reviews Manager" 
      tableKey="reviews" 
      headingSlug="reviews_heading"
      fields={fields} 
    />
  );
}

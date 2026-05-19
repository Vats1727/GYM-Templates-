import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TreatmentsManager() {
  const fields = [
    {
      "key": "icon",
      "label": "Treatment Icon",
      "type": "icon"
    },
    {
      "key": "title",
      "label": "Treatment Title (e.g. Classical Homoeopathy)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Detailed Description",
      "type": "textarea"
    },
    {
      "key": "tags",
      "label": "Key Symptoms / Tags (e.g. Anxiety, Autoimmune, PCOS)",
      "type": "repeater"
    }
  ];

  return (
    <GenericManager 
      title="Treatments Manager" 
      tableKey="treatments" 
      headingSlug="treatments_heading"
      fields={fields} 
    />
  );
}

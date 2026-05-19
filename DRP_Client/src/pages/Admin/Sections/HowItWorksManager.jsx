import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HowItWorksManager() {
  const fields = [
    {
      "key": "num",
      "label": "Step Number (e.g. 1, 2, 3...)",
      "type": "text"
    },
    {
      "key": "title",
      "label": "Step Title (e.g. Book Your Slot)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Step Description",
      "type": "textarea"
    }
  ];

  return (
    <GenericManager 
      title="How It Works / Healing Journey Steps" 
      tableKey="process_steps" 
      headingSlug="process_steps_heading"
      fields={fields} 
    />
  );
}

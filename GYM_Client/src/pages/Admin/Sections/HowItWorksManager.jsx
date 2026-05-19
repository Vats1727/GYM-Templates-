import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function HowItWorksManager() {
  const fields = [
    {
      "key": "num",
      "label": "Step Number (e.g. 01)",
      "type": "text"
    },
    {
      "key": "icon",
      "label": "Step Icon",
      "type": "icon"
    },
    {
      "key": "title",
      "label": "Step Title (e.g. Apply Online)",
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
      title="How We Work / Process Steps Manager" 
      tableKey="process_steps" 
      headingSlug="process_steps_heading"
      fields={fields} 
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function FaqManager() {
  const fields = [
    {
      "key": "question",
      "label": "Collapsible FAQ Question Title",
      "type": "text"
    },
    {
      "key": "answer",
      "label": "Accordion Answer Body Content",
      "type": "textarea"
    }
  ];

  return (
    <GenericManager 
      title="FAQ Accordion Manager" 
      tableKey="faq" 
      headingSlug="faq_heading"
      fields={fields} 
    />
  );
}

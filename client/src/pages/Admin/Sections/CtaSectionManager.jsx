import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function CtaSectionManager() {
  const fields = [
    {
      "key": "tag",
      "label": "Tagline / Label (e.g. Start Today)",
      "type": "text"
    },
    {
      "key": "title_line1",
      "label": "Title Line 1 (e.g. NO MORE)",
      "type": "text"
    },
    {
      "key": "title_line2",
      "label": "Title Line 2 (e.g. WAITING)",
      "type": "text"
    },
    {
      "key": "title_line3",
      "label": "Title Line 3 (e.g. FOR CHANGE)",
      "type": "text"
    },
    {
      "key": "subtitle",
      "label": "Subtitle / Description",
      "type": "textarea"
    },
    {
      "key": "btn1_text",
      "label": "Primary Button Label (e.g. Claim Free Trial)",
      "type": "text"
    },
    {
      "key": "btn2_text",
      "label": "Secondary Button Label (e.g. View Schedule)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="CTA Section Manager" 
      tableKey="cta_section" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

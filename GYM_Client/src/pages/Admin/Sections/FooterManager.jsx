import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function FooterManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Logo Prefix (e.g. MARCUS)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Suffix/Accent (e.g. REID)",
      "type": "text"
    },
    {
      "key": "description",
      "label": "Footer Description Bio Text",
      "type": "textarea"
    },
    {
      "key": "email",
      "label": "Contact Email",
      "type": "text"
    },
    {
      "key": "whatsapp",
      "label": "WhatsApp / Phone (e.g., +971 50 123 4567)",
      "type": "text"
    },
    {
      "key": "address",
      "label": "Office Address / Locations",
      "type": "text"
    },
    {
      "key": "hours",
      "label": "Coaching Hours Details",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Footer & Contact Settings" 
      tableKey="footer" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

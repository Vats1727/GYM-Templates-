import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function FooterManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Logo Prefix (e.g. Dr. Aisha)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Suffix/Accent (e.g. Malik)",
      "type": "text"
    },
    {
      "key": "description",
      "label": "Footer Description Text",
      "type": "textarea"
    },
    {
      "key": "email",
      "label": "Contact Email",
      "type": "text"
    },
    {
      "key": "whatsapp",
      "label": "WhatsApp / Phone",
      "type": "text"
    },
    {
      "key": "address",
      "label": "Clinic Address / Online Status",
      "type": "text"
    },
    {
      "key": "hours",
      "label": "Working Hours",
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

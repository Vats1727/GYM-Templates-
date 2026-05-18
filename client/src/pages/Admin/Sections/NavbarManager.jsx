import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function NavbarManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Logo Base Text (e.g. IRON)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Accent Text (e.g. X)",
      "type": "text"
    },
    {
      "key": "cta_text",
      "label": "CTA Button Text (e.g. JOIN NOW)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Navigation Bar Manager" 
      tableKey="navbar" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function NavbarManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Logo Brand Prefix (e.g. MARCUS)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Accent Suffix (e.g. REID)",
      "type": "text"
    },
    {
      "key": "cta_text",
      "label": "CTA Button Text (e.g. Start Now)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Navbar & Branding Settings" 
      tableKey="navbar" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function NavbarManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Logo Text Prefix (e.g. Dr. Aisha)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Text Suffix/Accent (e.g. Malik)",
      "type": "text"
    },
    {
      "key": "cta_text",
      "label": "CTA Button Text (e.g. Book Consult)",
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

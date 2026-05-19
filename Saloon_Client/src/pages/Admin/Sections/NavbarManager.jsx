import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function NavbarManager() {
  const fields = [
    {
      "key": "logo_text",
      "label": "Brand / Studio Logo Text (e.g. Velour)",
      "type": "text"
    },
    {
      "key": "logo_accent",
      "label": "Logo Accent Character (e.g. .)",
      "type": "text"
    },
    {
      "key": "cta_text",
      "label": "Book Now Button Text (e.g. Book Now)",
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

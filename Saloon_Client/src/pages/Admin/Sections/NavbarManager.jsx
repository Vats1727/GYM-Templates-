import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function NavbarManager() {
  const fields = [
    {
      "key": "brand_name",
      "label": "Brand / Studio Logo Text (e.g. VELOUR STUDIO)",
      "type": "text"
    },
    {
      "key": "announcement",
      "label": "Top bar Ribbon Announcement (e.g. 20% OFF FIRST BOOKING)",
      "type": "text"
    },
    {
      "key": "contact_phone",
      "label": "Fast Book Header Phone Link (e.g. +1 (555) 782-9989)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Navbar & Announcement Settings" 
      tableKey="navbar_settings" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

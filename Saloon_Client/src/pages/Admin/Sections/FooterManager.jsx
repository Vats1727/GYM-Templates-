import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function FooterManager() {
  const fields = [
    {
      "key": "about_text",
      "label": "About Studio Description (e.g. Premium boutique hair & nail styling space designed to elevate your personal style.)",
      "type": "textarea"
    },
    {
      "key": "phone",
      "label": "Contact Phone Link",
      "type": "text"
    },
    {
      "key": "email",
      "label": "Contact Email Address",
      "type": "text"
    },
    {
      "key": "address",
      "label": "Studio Street Address Location",
      "type": "text"
    },
    {
      "key": "hours_weekdays",
      "label": "Weekday Hours (e.g. Mon - Fri: 9:00 AM - 8:00 PM)",
      "type": "text"
    },
    {
      "key": "hours_weekends",
      "label": "Weekend Hours (e.g. Sat - Sun: 10:00 AM - 6:00 PM)",
      "type": "text"
    },
    {
      "key": "copyright",
      "label": "Footer Copyright Note",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Footer Settings Manager" 
      tableKey="footer_settings" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

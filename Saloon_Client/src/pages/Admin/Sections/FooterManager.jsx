import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function FooterManager() {
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
      "key": "description",
      "label": "About Studio Description / Tagline",
      "type": "textarea"
    },
    {
      "key": "address_line1",
      "label": "Address Line 1 (e.g. 123 Law Garden Road)",
      "type": "text"
    },
    {
      "key": "address_line2",
      "label": "Address Line 2 (e.g. Ahmedabad, Gujarat 380009)",
      "type": "text"
    },
    {
      "key": "hours_line1",
      "label": "Timing Line 1 (e.g. Mon–Sat: 10am – 8pm)",
      "type": "text"
    },
    {
      "key": "hours_line2",
      "label": "Timing Line 2 (e.g. Sunday: 11am – 6pm)",
      "type": "text"
    },
    {
      "key": "phone_number",
      "label": "Contact Phone Number (e.g. +91 79 555 0199)",
      "type": "text"
    },
    {
      "key": "fb_link",
      "label": "Facebook Page URL",
      "type": "text"
    },
    {
      "key": "ig_link",
      "label": "Instagram Page URL",
      "type": "text"
    },
    {
      "key": "tw_link",
      "label": "Twitter Profile URL",
      "type": "text"
    },
    {
      "key": "yt_link",
      "label": "YouTube Channel URL",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Footer Settings Manager" 
      tableKey="footer" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

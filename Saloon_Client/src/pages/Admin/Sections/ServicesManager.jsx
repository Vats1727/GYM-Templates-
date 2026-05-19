import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ServicesManager() {
  const fields = [
    {
      "key": "category",
      "label": "Service Category Name",
      "type": "select",
      "options": ["Cuts & Styling", "Color & Texture", "Grooming", "Skin & Beauty"]
    },
    {
      "key": "icon",
      "label": "Category Icon",
      "type": "icon"
    },
    {
      "key": "features",
      "label": "Service Items",
      "type": "object_list",
      "schema": [
        { "key": "n", "label": "Service Name (e.g. Signature Cut)", "type": "text", "placeholder": "Signature Cut" },
        { "key": "p", "label": "Service Price (e.g. ₹1,500)", "type": "text", "placeholder": "₹1,500" },
        { "key": "d", "label": "Description (e.g. Shampoo, precision cut...)", "type": "text", "placeholder": "Shampoo, precision cut, blow-dry" }
      ]
    }
  ];

  return (
    <GenericManager 
      title="Services & Pricing Category Manager" 
      tableKey="services" 
      headingSlug="services_heading"
      fields={fields} 
    />
  );
}

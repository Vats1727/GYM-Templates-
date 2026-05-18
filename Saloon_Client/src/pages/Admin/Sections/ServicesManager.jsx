import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ServicesManager() {
  const fields = [
    {
      "key": "category",
      "label": "Service Category (e.g. Haircare, Makeup, Skincare, Nailcare)",
      "type": "text"
    },
    {
      "key": "name",
      "label": "Service Name (e.g. Balayage & Styling)",
      "type": "text"
    },
    {
      "key": "price",
      "label": "Service Price (e.g. $180+)",
      "type": "text"
    },
    {
      "key": "duration",
      "label": "Duration (e.g. 120 min)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Description of the Service",
      "type": "textarea"
    },
    {
      "key": "popular",
      "label": "Popular / Recommended Service?",
      "type": "boolean"
    },
    {
      "key": "features",
      "label": "Service Features & Inclusions (Add item list)",
      "type": "repeater"
    }
  ];

  return (
    <GenericManager 
      title="Services Manager" 
      tableKey="services" 
      headingSlug="services_heading"
      fields={fields} 
    />
  );
}

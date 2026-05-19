import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TickerManager() {
  const fields = [
    {
      "key": "text",
      "label": "Award Title (e.g. Best Salon)",
      "type": "text"
    },
    {
      "key": "body",
      "label": "Award Publisher / Date (e.g. Ahmedabad Times · 2024)",
      "type": "text"
    },
    {
      "key": "icon",
      "label": "Accompanying Icon",
      "type": "icon"
    }
  ];

  return (
    <GenericManager 
      title="Press Ticker Manager" 
      tableKey="ticker" 
      fields={fields} 
    />
  );
}

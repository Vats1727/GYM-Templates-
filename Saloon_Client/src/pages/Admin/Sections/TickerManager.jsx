import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TickerManager() {
  const fields = [
    {
      "key": "text",
      "label": "Scrollable Award/Text Item (e.g. VOGUE BEST SALON 2025)",
      "type": "text"
    },
    {
      "key": "icon",
      "label": "Accompanying Icon (e.g. Star, Heart, Award)",
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

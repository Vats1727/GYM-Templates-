import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TickerManager() {
  const fields = [
  {
    "key": "item_text",
    "label": "Ticker Item Text",
    "type": "text"
  }
];

  return (
    <GenericManager 
      title="Ticker Manager" 
      tableKey="ticker" 
      fields={fields} 
    />
  );
}

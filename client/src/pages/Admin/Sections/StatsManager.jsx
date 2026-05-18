import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function StatsManager() {
  const fields = [
  {
    "key": "num",
    "label": "Stat Number",
    "type": "text"
  },
  {
    "key": "suf",
    "label": "Suffix (e.g. + or %)",
    "type": "text"
  },
  {
    "key": "label",
    "label": "Label",
    "type": "text"
  }
];

  return (
    <GenericManager 
      title="Stats Manager" 
      tableKey="stats" 
      fields={fields} 
    />
  );
}

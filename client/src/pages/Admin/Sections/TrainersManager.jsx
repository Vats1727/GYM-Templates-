import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TrainersManager() {
  const fields = [
  {
    "key": "num",
    "label": "Trainer Number",
    "type": "text"
  },
  {
    "key": "name",
    "label": "Trainer Name",
    "type": "text"
  },
  {
    "key": "role",
    "label": "Focus / Role",
    "type": "text"
  },
  {
    "key": "image",
    "label": "Trainer Image",
    "type": "image"
  },
  {
    "key": "color",
    "label": "CSS Color Class",
    "type": "text"
  }
];

  return (
    <GenericManager 
      title="Trainers Manager" 
      tableKey="trainers" 
      fields={fields} 
      headingSlug="trainers_section"
    />
  );
}

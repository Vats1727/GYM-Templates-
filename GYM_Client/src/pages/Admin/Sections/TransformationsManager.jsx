import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TransformationsManager() {
  const fields = [
    {
      "key": "name",
      "label": "Client Name (e.g., James K.)",
      "type": "text"
    },
    {
      "key": "detail",
      "label": "Client Bio Details (e.g., 32 · Sales Director · 6-Month Program)",
      "type": "text"
    },
    {
      "key": "beforeType",
      "label": "Before Body Type (Illustration)",
      "type": "select",
      "options": ["male_skinny_fat", "female_before", "male_athletic_before"]
    },
    {
      "key": "afterType",
      "label": "After Body Type (Illustration)",
      "type": "select",
      "options": ["male_muscular", "female_after", "male_athletic_after"]
    },
    {
      "key": "metrics",
      "label": "Key Transformation Metrics",
      "type": "object_list",
      "schema": [
        { "key": "val", "label": "Value (e.g., -22kg, +14%, 6mo)", "type": "text" },
        { "key": "label", "label": "Label (e.g., Weight Lost, Muscle, Timeline)", "type": "text" }
      ]
    }
  ];

  return (
    <GenericManager 
      title="Client Transformations Manager" 
      tableKey="transformations" 
      headingSlug="transformations_heading"
      fields={fields} 
    />
  );
}

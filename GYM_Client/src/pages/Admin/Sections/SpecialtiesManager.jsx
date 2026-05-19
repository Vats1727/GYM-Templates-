import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function SpecialtiesManager() {
  const fields = [
    {
      "key": "num",
      "label": "Number Badge (e.g. 01)",
      "type": "text"
    },
    {
      "key": "icon",
      "label": "Specialty Icon",
      "type": "icon"
    },
    {
      "key": "title",
      "label": "Specialty Title",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Detailed Description",
      "type": "textarea"
    },
    {
      "key": "tags",
      "label": "Specialty Focus Tags (e.g. Powerlifting, Macros, Speed)",
      "type": "repeater"
    }
  ];

  return (
    <GenericManager 
      title="Training Specialties Manager" 
      tableKey="specialties" 
      headingSlug="specialties_heading"
      fields={fields} 
    />
  );
}

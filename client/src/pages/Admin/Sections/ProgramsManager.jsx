import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ProgramsManager() {
  const fields = [
  {
    "key": "num",
    "label": "Program Number",
    "type": "text"
  },
  {
    "key": "icon",
    "label": "Lucide Icon",
    "type": "icon"
  },
  {
    "key": "tag",
    "label": "Tag",
    "type": "text"
  },
  {
    "key": "name",
    "label": "Program Name",
    "type": "text"
  },
  {
    "key": "desc",
    "label": "Description",
    "type": "textarea"
  },
  {
    "key": "featured",
    "label": "Is Featured?",
    "type": "boolean"
  }
];

  return (
    <GenericManager 
      title="Programs Manager" 
      tableKey="programs" 
      fields={fields} 
      headingSlug="programs_section"
    />
  );
}

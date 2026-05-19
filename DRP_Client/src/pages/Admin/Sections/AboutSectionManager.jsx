import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function AboutSectionManager() {
  const fields = [
    {
      "key": "image",
      "label": "About Profile Image (Leave blank to use default vector illustration)",
      "type": "image"
    },
    {
      "key": "tag",
      "label": "Section Tag (e.g. About the Doctor)",
      "type": "text"
    },
    {
      "key": "title",
      "label": "Section Title",
      "type": "text"
    },
    {
      "key": "desc1",
      "label": "Paragraph 1 Description",
      "type": "textarea"
    },
    {
      "key": "desc2",
      "label": "Paragraph 2 Description",
      "type": "textarea"
    },
    {
      "key": "cards",
      "label": "Achievements & Qualifications list",
      "type": "object_list",
      "schema": [
        { "key": "icon", "label": "Icon", "type": "icon" },
        { "key": "title", "label": "Title", "type": "text" },
        { "key": "desc", "label": "Detail / Description", "type": "text" }
      ]
    }
  ];

  return (
    <GenericManager 
      title="About Section Settings" 
      tableKey="about_section" 
      fields={fields} 
      isSingleRow={true}
    />
  );
}

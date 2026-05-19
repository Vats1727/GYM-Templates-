import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function AboutSectionManager() {
  const fields = [
    {
      "key": "image",
      "label": "About Profile Image (Leave blank to use default)",
      "type": "image"
    },
    {
      "key": "tag",
      "label": "Section Tag (e.g., About Marcus)",
      "type": "text"
    },
    {
      "key": "title",
      "label": "Section Main Title",
      "type": "textarea"
    },
    {
      "key": "desc1",
      "label": "Biography Paragraph 1",
      "type": "textarea"
    },
    {
      "key": "desc2",
      "label": "Biography Paragraph 2",
      "type": "textarea"
    },
    {
      "key": "desc3",
      "label": "Biography Paragraph 3",
      "type": "textarea"
    },
    {
      "key": "experience_years",
      "label": "Years of Experience (Numeric Watermark)",
      "type": "text"
    },
    {
      "key": "cards",
      "label": "Certifications & Achievements list",
      "type": "object_list",
      "schema": [
        { "key": "icon", "label": "Icon", "type": "icon" },
        { "key": "title", "label": "Certification Title", "type": "text" },
        { "key": "desc", "label": "Specialization Detail", "type": "text" }
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

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TestimonialsManager() {
  const fields = [
  {
    "key": "name",
    "label": "Member Name",
    "type": "text"
  },
  {
    "key": "detail",
    "label": "Detail (e.g. Member since...)",
    "type": "text"
  },
  {
    "key": "quote",
    "label": "Testimonial Quote",
    "type": "textarea"
  },
  {
    "key": "avatar",
    "label": "Member Image",
    "type": "image"
  },
  {
    "key": "stars",
    "label": "Star Count (1-5)",
    "type": "stars"
  }
];

  return (
    <GenericManager 
      title="Testimonials Manager" 
      tableKey="testimonials" 
      fields={fields} 
      headingSlug="testimonials_section"
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TestimonialsManager() {
  const fields = [
    {
      "key": "avatar",
      "label": "Author Initials (e.g. JK)",
      "type": "text"
    },
    {
      "key": "stars",
      "label": "Rating Score Stars",
      "type": "stars"
    },
    {
      "key": "text",
      "label": "Review Description Text",
      "type": "textarea"
    },
    {
      "key": "authorName",
      "label": "Client Full Name",
      "type": "text"
    },
    {
      "key": "authorMeta",
      "label": "Client Metadata (e.g. Sales Director · Dubai · 6 months)",
      "type": "text"
    },
    {
      "key": "result",
      "label": "Transformation Outcome Accent Result (e.g. Lost 22kg)",
      "type": "text"
    },
    {
      "key": "featured",
      "label": "Featured Review Highlight Status",
      "type": "boolean"
    },
    {
      "key": "avatarColors",
      "label": "Avatar Gradient Hex Color List (e.g. #e8ff00, #aabb00)",
      "type": "repeater"
    }
  ];

  return (
    <GenericManager 
      title="Client Reviews / Testimonials Manager" 
      tableKey="testimonials" 
      headingSlug="testimonials_heading"
      fields={fields} 
    />
  );
}

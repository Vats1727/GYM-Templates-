import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ReviewsManager() {
  const fields = [
    {
      "key": "name",
      "label": "Client Name (e.g. Samantha K.)",
      "type": "text"
    },
    {
      "key": "badge",
      "label": "Verification Label (e.g. Verified Balayage Client)",
      "type": "text"
    },
    {
      "key": "text",
      "label": "Review Feedback Paragraph",
      "type": "textarea"
    },
    {
      "key": "rating",
      "label": "Review Rating Score",
      "type": "stars"
    },
    {
      "key": "avatar",
      "label": "Client Profile Photo / Logo",
      "type": "image"
    }
  ];

  return (
    <GenericManager 
      title="Client Reviews Manager" 
      tableKey="reviews" 
      headingSlug="reviews_heading"
      fields={fields} 
    />
  );
}

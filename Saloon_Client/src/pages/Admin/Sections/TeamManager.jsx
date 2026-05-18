import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function TeamManager() {
  const fields = [
    {
      "key": "name",
      "label": "Stylist Full Name",
      "type": "text"
    },
    {
      "key": "role",
      "label": "Specialization Role (e.g. Master Colorist)",
      "type": "text"
    },
    {
      "key": "experience",
      "label": "Years of Experience (e.g. 12 Years Exp)",
      "type": "text"
    },
    {
      "key": "rating",
      "label": "Customer Satisfaction Rating (1-5 Stars)",
      "type": "stars"
    },
    {
      "key": "image",
      "label": "Stylist Professional Photo",
      "type": "image"
    },
    {
      "key": "socials",
      "label": "Stylist Social Links",
      "type": "social_links"
    },
    {
      "key": "slots",
      "label": "Available Booking Time Slots (Add lists e.g. 10:00 AM, 1:00 PM)",
      "type": "repeater"
    }
  ];

  return (
    <GenericManager 
      title="Top Stylists Team Manager" 
      tableKey="team" 
      headingSlug="team_heading"
      fields={fields} 
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ProgramsManager() {
  const fields = [
    {
      "key": "name",
      "label": "Program Plan Name (e.g. Elite Coaching)",
      "type": "text"
    },
    {
      "key": "price",
      "label": "Price Tag Value (e.g. 299)",
      "type": "text"
    },
    {
      "key": "billing",
      "label": "Billing Frequency (e.g. /mo)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Plan Quick Summary Description",
      "type": "textarea"
    },
    {
      "key": "features",
      "label": "Features Checklist",
      "type": "repeater"
    },
    {
      "key": "featured",
      "label": "Highlight Featured/Popular Card",
      "type": "boolean"
    },
    {
      "key": "btnText",
      "label": "CTA Button Text (e.g. Get Started)",
      "type": "text"
    }
  ];

  return (
    <GenericManager 
      title="Membership pricing plans / Programs Manager" 
      tableKey="pricing_plans" 
      headingSlug="pricing_plans_heading"
      fields={fields} 
    />
  );
}

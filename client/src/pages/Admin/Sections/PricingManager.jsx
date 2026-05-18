import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function PricingManager() {
  const fields = [
  {
    "key": "plan",
    "label": "Plan Name",
    "type": "text"
  },
  {
    "key": "amount",
    "label": "Price ($)",
    "type": "text"
  },
  {
    "key": "popular",
    "label": "Is Popular?",
    "type": "boolean"
  },
  {
    "key": "features_json",
    "label": "Features List Items",
    "type": "repeater"
  }
];

  return (
    <GenericManager 
      title="Pricing Manager" 
      tableKey="pricing" 
      fields={fields} 
      headingSlug="pricing_section"
    />
  );
}

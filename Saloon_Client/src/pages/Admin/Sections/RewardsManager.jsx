import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function RewardsManager() {
  const fields = [
    {
      "key": "points",
      "label": "Reward Points Required (e.g. 500 points)",
      "type": "text"
    },
    {
      "key": "title",
      "label": "Benefit Title (e.g. Free Blowout & Polish)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Reward Explanation Details",
      "type": "textarea"
    },
    {
      "key": "icon",
      "label": "Reward Box Accent Icon (e.g. Gift, Sparkles, Award)",
      "type": "icon"
    }
  ];

  return (
    <GenericManager 
      title="Member Rewards Manager" 
      tableKey="rewards" 
      headingSlug="rewards_heading"
      fields={fields} 
    />
  );
}

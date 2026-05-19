import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function CaseStudiesManager() {
  const fields = [
    {
      "key": "name",
      "label": "Patient Name (e.g. Fatima M.)",
      "type": "text"
    },
    {
      "key": "initials",
      "label": "Patient Initials (e.g. FM)",
      "type": "text"
    },
    {
      "key": "age",
      "label": "Patient Age",
      "type": "text"
    },
    {
      "key": "location",
      "label": "Patient Location (e.g. Dubai, UAE)",
      "type": "text"
    },
    {
      "key": "case_status",
      "label": "Case Recovery Status",
      "type": "select",
      "options": ["Recovered", "Managed", "Clear", "Stabilised", "Well"]
    },
    {
      "key": "condition",
      "label": "Medical Condition Treated (e.g. PCOS + Hormonal Imbalance)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Case Study Details / Narrative",
      "type": "textarea"
    },
    {
      "key": "avatarGradient",
      "label": "Avatar Gradient CSS (e.g. linear-gradient(135deg, var(--accent), var(--gold)))",
      "type": "text"
    },
    {
      "key": "metrics",
      "label": "Key Outcome Metrics",
      "type": "object_list",
      "schema": [
        { "key": "val", "label": "Metric Value (e.g. 5mo, 95%, BP 120/80)", "type": "text", "placeholder": "5mo" },
        { "key": "label", "label": "Metric Label (e.g. Duration, Skin Clear, BP Now)", "type": "text", "placeholder": "Duration" }
      ]
    }
  ];

  return (
    <GenericManager 
      title="Case Studies Manager" 
      tableKey="case_studies" 
      headingSlug="case_studies_heading"
      fields={fields} 
    />
  );
}

import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ScheduleManager() {
  const fields = [
  {
    "key": "day",
    "label": "Weekday (Mon/Tue/Wed)",
    "type": "text"
  },
  {
    "key": "time",
    "label": "Time Range",
    "type": "text"
  },
  {
    "key": "name",
    "label": "Class Name",
    "type": "text"
  },
  {
    "key": "trainer",
    "label": "Trainer Name",
    "type": "text"
  },
  {
    "key": "duration",
    "label": "Duration (min)",
    "type": "text"
  },
  {
    "key": "type",
    "label": "Type (e.g. HIIT/Yoga)",
    "type": "text"
  },
  {
    "key": "spots",
    "label": "Spots Left (0-100%)",
    "type": "text"
  }
];

  return (
    <GenericManager 
      title="Schedule Manager" 
      tableKey="schedule" 
      fields={fields} 
      headingSlug="schedule_section"
    />
  );
}

const fs = require('fs');
const path = require('path');

const sections = [
    { 
        key: 'hero_section', 
        name: 'Hero Section',
        fields: [
            { key: 'tag', label: 'Hero Tagline', type: 'text' },
            { key: 'title', label: 'Hero Title', type: 'textarea' },
            { key: 'subtitle', label: 'Hero Subtitle', type: 'textarea' },
            { key: 'stats_json', label: 'Hero Stats JSON', type: 'textarea' },
        ]
    },
    { 
        key: 'ticker', 
        name: 'Ticker',
        fields: [
            { key: 'item_text', label: 'Ticker Item Text', type: 'text' },
        ]
    },
    { 
        key: 'programs', 
        name: 'Programs',
        fields: [
            { key: 'num', label: 'Program Number', type: 'text' },
            { key: 'icon', label: 'Lucide Icon', type: 'icon' },
            { key: 'tag', label: 'Tag', type: 'text' },
            { key: 'name', label: 'Program Name', type: 'text' },
            { key: 'desc', label: 'Description', type: 'textarea' },
            { key: 'featured', label: 'Is Featured?', type: 'boolean' },
        ]
    },
    { 
        key: 'stats', 
        name: 'Stats',
        fields: [
            { key: 'num', label: 'Stat Number', type: 'text' },
            { key: 'suf', label: 'Suffix (e.g. + or %)', type: 'text' },
            { key: 'label', label: 'Label', type: 'text' },
        ]
    },
    { 
        key: 'trainers', 
        name: 'Trainers',
        fields: [
            { key: 'num', label: 'Trainer Number', type: 'text' },
            { key: 'name', label: 'Trainer Name', type: 'text' },
            { key: 'role', label: 'Focus / Role', type: 'text' },
            { key: 'icon', label: 'Lucide Icon', type: 'icon' },
            { key: 'color', label: 'CSS Color Class', type: 'text' },
        ]
    },
    { 
        key: 'pricing', 
        name: 'Pricing',
        fields: [
            { key: 'plan', label: 'Plan Name', type: 'text' },
            { key: 'amount', label: 'Price ($)', type: 'text' },
            { key: 'popular', label: 'Is Popular?', type: 'boolean' },
            { key: 'features_json', label: 'Features JSON Array', type: 'textarea' },
        ]
    },
    { 
        key: 'schedule', 
        name: 'Schedule',
        fields: [
            { key: 'day', label: 'Weekday (Mon/Tue/Wed)', type: 'text' },
            { key: 'time', label: 'Time Range', type: 'text' },
            { key: 'name', label: 'Class Name', type: 'text' },
            { key: 'trainer', label: 'Trainer Name', type: 'text' },
            { key: 'duration', label: 'Duration (min)', type: 'text' },
            { key: 'type', label: 'Type (e.g. HIIT/Yoga)', type: 'text' },
            { key: 'spots', label: 'Spots Left (0-100%)', type: 'text' },
        ]
    },
    { 
        key: 'testimonials', 
        name: 'Testimonials',
        fields: [
            { key: 'name', label: 'Member Name', type: 'text' },
            { key: 'detail', label: 'Detail (e.g. Member since...)', type: 'text' },
            { key: 'quote', label: 'Testimonial Quote', type: 'textarea' },
            { key: 'avatar', label: 'Avatar Emoji', type: 'text' },
            { key: 'stars', label: 'Star Count (1-5)', type: 'text' },
        ]
    }
];

const adminSectionsDir = path.join(__dirname, 'pages', 'Admin', 'Sections');
if (!fs.existsSync(adminSectionsDir)) {
    fs.mkdirSync(adminSectionsDir, { recursive: true });
}

sections.forEach(section => {
    const camelCase = section.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const managerName = `${camelCase}Manager`;

    const content = `import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ${managerName}() {
  const fields = ${JSON.stringify(section.fields, null, 2)};

  return (
    <GenericManager 
      title="${section.name} Manager" 
      tableKey="${section.key}" 
      fields={fields} 
    />
  );
}
`;
    fs.writeFileSync(path.join(adminSectionsDir, `${managerName}.jsx`), content);
});

console.log('Re-generated 8 real active CRUD admin modules successfully.');

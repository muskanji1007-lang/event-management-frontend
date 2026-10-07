const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const regex = /export const predictRegistrations = async \(eventData\) => \{[\s\S]*?body: JSON\.stringify\(eventData\),/;

const replacement = `export const predictRegistrations = async (eventData) => {
  const token = getAuthToken();
  const payload = {
    event_name: eventData.title || eventData.event_name,
    category: eventData.category,
    mode: eventData.mode
  };
  try {
    const response = await fetch(
      \`\${ML_BASE_URL}/organizer/predict-registrations\`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: \`Bearer \${token}\`,
        },
        body: JSON.stringify(payload),`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/services/api.js', content);

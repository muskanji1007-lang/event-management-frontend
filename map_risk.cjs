const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const regex = /export const getEventRisk = async \(eventData\) => \{[\s\S]*?body: JSON\.stringify\(eventData\),/;

const replacement = `export const getEventRisk = async (eventData) => {
  const token = getAuthToken();
  const payload = {
    budget: eventData.prize_money || eventData.budget || 0,
    expected_attendees: eventData.maxParticipants || eventData.expected_attendees || 100
  };
  try {
    const response = await fetch(\`\${ML_BASE_URL}/admin/event-risk\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: \`Bearer \${token}\`,
      },
      body: JSON.stringify(payload),`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/services/api.js', content);

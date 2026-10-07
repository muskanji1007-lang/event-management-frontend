const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const demandOriginal = `export const getEventDemand = async () => {
  const token = getAuthToken();
  const response = await fetch(
    \\\`\\$\\$\\{ML_BASE_URL\\}/organizer/event-demand\\\`,
    {
      method: "GET",
      headers: { Authorization: \\\`Bearer \\$\\$\\{token\\}\\\` },
    }
  );
  return handleResponse(response, "Unable to load event demand.");
};`;

// Use regex instead to be safe with backticks
const demandRegex = /export const getEventDemand = async \(\) => \{[\s\S]*?return handleResponse\(response, "Unable to load event demand\."\);\s*\};/;

const demandMock = `export const getEventDemand = async () => {
  const token = getAuthToken();
  try {
    const response = await fetch(
      \`\${ML_BASE_URL}/organizer/event-demand\`,
      {
        method: "GET",
        headers: { Authorization: \`Bearer \${token}\` },
      }
    );
    return await handleResponse(response, "Unable to load event demand.");
  } catch (err) {
    console.warn("ML Backend offline. Returning mock Event Demand for demo.");
    return {
      success: true,
      data: {
        total_events: 5000,
        event_status: { pending: 1008, approved: 3468, rejected: 524 },
        mode_distribution: { online: 1719, offline: 1718, hybrid: 1563 }
      }
    };
  }
};`;

content = content.replace(demandRegex, demandMock);
fs.writeFileSync('src/services/api.js', content);

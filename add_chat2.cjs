const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

const chatEndpoint = `
/**
 * 5.10 AI Chatbot (Gemini Assistant)
 * @param {{ message: string, previous_interaction_id?: string }} data
 */
export const sendChatMessage = async (data) => {
  const token = getAuthToken();
  const response = await fetch(\`\${ML_BASE_URL}/chat\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Unable to get chat response.");
};
`;

content += chatEndpoint;
fs.writeFileSync('src/services/api.js', content);

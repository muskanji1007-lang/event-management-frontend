const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

// The line is exactly: const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || "${ML_BASE_URL}";
content = content.replace('const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || "${ML_BASE_URL}";', 'const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || "http://127.0.0.1:8000";');

// Also relax handleResponse to not throw aggressively if it can parse json
content = content.replace(
  `  if (!contentType.includes("application/json")) {
    await response.text(); // consume body to avoid memory leaks
    throw new Error(
      \`Server error (\${response.status}). Please check the API URL.\`
    );
  }

  const data = await response.json();`,
  `  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error(
      \`Server error (\${response.status}). API returned non-JSON response.\`
    );
  }`
);

fs.writeFileSync('src/services/api.js', content);

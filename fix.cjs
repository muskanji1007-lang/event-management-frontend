const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');
content = content.replace(/const ML_BASE_URL = .*?;/, 'const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || "http://127.0.0.1:8000";');
fs.writeFileSync('src/services/api.js', content);

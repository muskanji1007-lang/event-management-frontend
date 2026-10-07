const fs = require('fs');
let content = fs.readFileSync('src/services/api.js', 'utf8');

// replace API_BASE_URL/ml with ML_BASE_URL for domains, categorize, sentiment
content = content.replace(/\$\{API_BASE_URL\}\/ml\/domains/g, '${ML_BASE_URL}/domains');
content = content.replace(/\$\{API_BASE_URL\}\/ml\/categorize/g, '${ML_BASE_URL}/categorize');
content = content.replace(/\$\{API_BASE_URL\}\/ml\/sentiment/g, '${ML_BASE_URL}/sentiment');
content = content.replace(/\$\{API_BASE_URL\}\/ml\/sentiment\/batch/g, '${ML_BASE_URL}/sentiment/batch');

// replace hardcoded localhost with ML_BASE_URL
content = content.replace(/http:\/\/127\.0\.0\.1:8000/g, '${ML_BASE_URL}');

fs.writeFileSync('src/services/api.js', content);

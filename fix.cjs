const fs = require('fs');
let content = fs.readFileSync('src/components/OpportunityCard.jsx', 'utf8');
content = content.replace(/className=\{\s*ounded-full[^>]+\>/g, 'className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}\n        >');
fs.writeFileSync('src/components/OpportunityCard.jsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/components/OpportunityCard.jsx', 'utf8');
content = content.replace(/className=\{\r?\nounded-full px-3 py-1 text-xs font-semibold \\\}/g, 'className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}');
fs.writeFileSync('src/components/OpportunityCard.jsx', content);

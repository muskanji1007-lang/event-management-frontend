const fs = require('fs');
let content = fs.readFileSync('src/pages/OrganizerDashboard/OrganizerDashboard.jsx', 'utf8');

const regex = /if\s*\(activePage === "Profile"\)\s*\{\s*return\s*\(\s*<section[\s\S]*?<\/section>\s*\);\s*\}/;

const newProfileCode = `if (activePage === "Profile") {
      return <OrganizerProfile darkMode={darkMode} />;
    }`;

content = content.replace(regex, newProfileCode);
fs.writeFileSync('src/pages/OrganizerDashboard/OrganizerDashboard.jsx', content);

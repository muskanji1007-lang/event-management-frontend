const fs = require('fs');
let content = fs.readFileSync('src/pages/OrganizerDashboard/OrganizerDashboard.jsx', 'utf8');

if (!content.includes('import OrganizerProfile from')) {
    content = content.replace('import Analytics from "./Analytics";', 'import Analytics from "./Analytics";\nimport OrganizerProfile from "./OrganizerProfile";');
}

const oldProfileCode = `    if (activePage === "Profile") {
      return (
        <section className="rounded-2xl p-6" style={{ background: card }}>
          <h2 className="mb-3 text-xl font-bold">Organizer Profile</h2>
          <p style={{ color: muted }}>
            Organizer profile details can be added here.
          </p>
        </section>
      );
    }`;

const newProfileCode = `    if (activePage === "Profile") {
      return <OrganizerProfile darkMode={darkMode} />;
    }`;

content = content.replace(oldProfileCode, newProfileCode);
fs.writeFileSync('src/pages/OrganizerDashboard/OrganizerDashboard.jsx', content);

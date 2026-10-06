# Opportunity Hub - Frontend

Welcome to the frontend repository for **Opportunity Hub**, an AI-powered platform connecting Students, Organizers, and Platform Administrators. 

This project is built using **React + Vite** and styled with **Tailwind CSS**.

## ✨ Features Overview

* **🎓 Student Portal:** Discover events, get AI-driven event recommendations based on skills/branch, and track registered opportunities.
* **📊 Organizer Dashboard:** Create events, predict expected registrations using ML, and view real-time platform analytics.
* **🛡️ Admin Dashboard:** Review and approve events, manage users, and view AI-powered risk/anomaly scores for newly submitted events.

## 🛠️ Tech Stack

* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Routing:** React Router

---

## 🚀 Getting Started

Follow these steps to set up the frontend on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* `npm` or `yarn`

### 2. Installation
Clone the repository and install the required dependencies:
```bash
git clone https://github.com/muskanji1007-lang/event-management-frontend.git
cd event-management-frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (next to `package.json`) and add your backend API URL. If you don't create this file, the app will fallback to the default deployed backend.

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
*(Note: Machine Learning endpoints currently point to `http://127.0.0.1:8000` by default as per the Python FastAPI specifications).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 📁 Project Structure (How to make changes)

If you are a developer looking to edit the code, here is a quick guide to finding things:

```text
src/
├── assets/         # Images, logos, and global CSS
├── components/     # Reusable UI components (Navbar, MatchScore, etc.)
├── pages/          # Main application screens (grouped by module)
│   ├── AdminDashboard/     # Admin views (Analytics, Approvals, Manage Events)
│   ├── OrganizerDashboard/ # Organizer views (Create Event, My Events, etc.)
│   ├── Profile/            # Student views (Explore, My Opportunities)
│   └── Auth/               # Login & Signup screens
├── services/
│   └── api.js      # ALL backend and ML API calls are centralized here
└── App.jsx         # Main routing and Layout component
```

### 🔌 Modifying API Calls
All API requests (GET, POST, PUT, DELETE) are handled in `src/services/api.js`. 
* If you need to change a backend endpoint, update the URL in this file.
* There is a "Local Demo Override" safely built into functions like `deleteOpportunity` and `updateOpportunity` to allow the UI to function smoothly even if the backend returns permission errors.

### 🎨 Modifying the UI
* The project uses **Tailwind CSS** for styling. You can change colors, padding, and layout by modifying the `className` attributes directly inside the React components.
* Dark mode is natively supported and passed down as a `darkMode` prop to various dashboard components.

---

## 🛑 Troubleshooting

* **Blank Screen / React Error:** Check the browser console (`F12`). Usually caused by a missing import or a broken API response.
* **CORS Errors:** Ensure your backend server has CORS enabled and allows requests from `http://localhost:5173`.
* **API calls returning 500 / Failing:** Ensure your Node.js backend and Python ML backend (`localhost:8000`) are actively running in the background.

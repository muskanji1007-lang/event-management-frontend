# 🚀 Opportunity Hub - Developer Guide

Welcome to the frontend code! This README is specifically written to help **anyone** understand the code and make changes easily, even if you are new to the project.

---

## 📂 1. Where to find things (Project Structure)

All the important code is inside the `src/` folder. Here is your cheat sheet:

* **`src/App.jsx`** ➡️ This is the main file. All the page routes (URLs) are defined here.
* **`src/services/api.js`** ➡️ **(Most Important File)** ALL backend API calls are written here. If your backend URL changes, you edit this file.
* **`src/pages/`** ➡️ Contains all the screens you see on the website, divided by folder:
  * `/AdminDashboard` (Manage Events, Analytics, Approvals)
  * `/OrganizerDashboard` (Create Event, My Events)
  * `/Profile` (Student My Opportunities, Explore)
  * `/Auth` (Login, Signup screens)
* **`src/components/`** ➡️ Reusable UI pieces like the `Navbar`, `MatchScore` circles, etc.

---

## 🛠️ 2. How to make changes easily

### 👉 How to change Backend API URLs
1. Open `src/services/api.js`.
2. At the top, you will see `API_BASE_URL` (for normal Node.js endpoints) and `ML_BASE_URL` (for Python ML endpoints).
3. Change them directly here:
   ```javascript
   const API_BASE_URL = "https://your-new-backend.com/api/v1";
   const ML_BASE_URL = "http://127.0.0.1:8000";
   ```

### 👉 How to change Colors and Styling
This project uses **Tailwind CSS**. You don't need to write custom CSS files! 
Just open any `.jsx` file and change the `className`.
* Example: To change a button from Green to Blue, find `bg-[#1F4D3F]` and change it to `bg-blue-600`.
* We also use inline styles for Dark Mode, like this: `style={{ background: card }}` where `card` changes color based on dark mode.

### 👉 How to add a New Page
1. Create a new file in `src/pages/`, for example `src/pages/ContactUs.jsx`.
2. Write a basic React component inside it.
3. Open `src/App.jsx`.
4. Import your new page at the top: `import ContactUs from "./pages/ContactUs";`
5. Add a route inside the `<Routes>` block: 
   `<Route path="/contact" element={<ContactUs />} />`

### 👉 How to fix "Backend is crashing" (The Demo Mode)
If the backend developer hasn't fixed the backend yet and APIs are throwing `500 Server Error` or `403 Access Denied`, you can still make the UI work for demonstrations!
* Open `src/services/api.js`.
* Find the function you want to mock (like `updateOpportunity`).
* In the `catch (error)` block, simply save the data to `localStorage` and return `{ success: true }`. The UI will magically think the backend worked perfectly! (We have already done this for approvals and deletions).

---

## 💻 3. How to Run the Project Locally

1. **Install Node.js** on your computer.
2. Open terminal in this folder and type:
   ```bash
   npm install
   ```
3. Start the server by typing:
   ```bash
   npm run dev
   ```
4. Click the local link provided (usually `http://localhost:5173`).

---

## 🚨 Quick Troubleshooting

* **Blank White Screen:** Press `F12` and look at the Console. You probably have a typo in your React code or forgot to `import` a file.
* **CORS Error in Network Tab:** This is a **Backend** issue, not frontend. Tell the backend developer to install the `cors` package and allow `http://localhost:5173`.
* **ML Features not working:** Ensure your Python FastAPI is running on `http://127.0.0.1:8000`. If it's running on a different port, update `ML_BASE_URL` in `src/services/api.js`.

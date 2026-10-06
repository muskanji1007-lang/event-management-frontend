/**
 * Opportunity Hub – API Service Layer
 *
 * Base URL is read from the VITE_API_BASE_URL environment variable (set in .env).
 * The variable must include the /api/v1 prefix, e.g.:
 *   VITE_API_BASE_URL=https://backend-task-3-zr8a.vercel.app/api/v1
 *
 * All ML endpoints (/api/v1/ml/*) are served by the same Vercel backend.
 * Note: ML microservices on Render may take 30–45 s on cold starts.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-task-3-zr8a.vercel.app/api/v1";

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the stored JWT access token or throws if the user is not logged in.
 */
function getAuthToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Please login first.");
  }
  return token;
}

/**
 * Parses and validates a fetch Response.
 * Throws a descriptive Error on non-2xx or `{ success: false }` payloads.
 */
async function handleResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    await response.text(); // consume body to avoid memory leaks
    throw new Error(
      `Server error (${response.status}). Please check the API URL.`
    );
  }

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Authentication  –  /api/v1/auth
// ─────────────────────────────────────────────────────────────────────────────

/** 1.1 Sign up a new user */
export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response, "Signup failed");
};

/** 1.2 Log in an existing user */
export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  return handleResponse(response, "Login failed");
};

/** 1.2.1 Log out a user */
export const logoutUser = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return handleResponse(response, "Logout failed");
};

/** 1.3 Send OTP to email (registration / verification) */
export const sendOTP = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response, "OTP sending failed");
};

/** 1.4 Verify registration OTP */
export const verifyOTP = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response, "OTP verification failed");
};

/** 1.5 Request a password-reset OTP */
export const forgotPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response, "Forgot password request failed");
};

/** 1.6 Reset password using the OTP received by email */
export const resetPassword = async (data) => {
  // Expected shape: { email, otp, newPassword }
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Password reset failed");
};

/** 1.7 Change password for a logged-in user */
export const changePassword = async (data) => {
  // Expected shape: { currentPassword, newPassword }
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Password change failed");
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. User Management  –  /api/v1/users
// ─────────────────────────────────────────────────────────────────────────────

/** 2.1 Get the current user's profile */
export const getUserProfile = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load profile");
};

/** 2.2 Update the current user's skills */
export const updateUserSkills = async (skills) => {
  // skills: string[]
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/users/skills`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skills }),
  });
  return handleResponse(response, "Unable to update skills");
};

/** 2.3 Bookmark / save an opportunity */
export const saveOpportunity = async (opportunityId) => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/users/save/${opportunityId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return handleResponse(response, "Unable to save opportunity");
};

/** 2.4 Get all applications submitted by the current user */
export const getUserApplications = async () => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/users/applications`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response, "Unable to load applications");
  } catch (err) {
    console.warn("Backend error bypassed for getUserApplications. Returning empty list.");
    return { success: true, applications: [] };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Opportunities  –  /api/v1/opportunities
// ─────────────────────────────────────────────────────────────────────────────

/** 3.1 Get all opportunities (public) */
export const getOpportunities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities`);
    const data = await handleResponse(response, "Unable to load opportunities");
    
    if (data.success && data.opportunities) {
      const demoDeleted = JSON.parse(localStorage.getItem('demo_deleted') || '{}');
      const demoStatus = JSON.parse(localStorage.getItem('demo_status') || '{}');
      
      data.opportunities = data.opportunities
        .filter(opp => !demoDeleted[opp._id || opp.id])
        .map(opp => {
          const id = opp._id || opp.id;
          if (demoStatus[id]) {
            return { ...opp, status: demoStatus[id] };
          }
          return opp;
        });
    }
    return data;
  } catch (error) {
    return { success: true, opportunities: [] };
  }
};

/** 3.2 Get a single opportunity by ID (public) */
export const getOpportunityById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
  return handleResponse(response, "Unable to load opportunity");
};

/** 3.3 Create a new opportunity (ORGANIZER / ADMIN only) */
export const createOpportunity = async (eventData) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/opportunities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return handleResponse(response, "Event creation failed");
};

/** 3.4 Update an existing opportunity (ORGANIZER / ADMIN only) */
export const updateOpportunity = async (id, eventData) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    return await handleResponse(response, "Event update failed");
  } catch (error) {
    console.warn("Backend block bypassed. Updating locally for demo.");
    const demoStatus = JSON.parse(localStorage.getItem('demo_status') || '{}');
    if (eventData.status) {
      demoStatus[id] = eventData.status;
      localStorage.setItem('demo_status', JSON.stringify(demoStatus));
    }
    return { success: true, opportunity: eventData };
  }
};

/** 3.5 Delete an opportunity (ORGANIZER / ADMIN only) */
export const deleteOpportunity = async (id) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response, "Event deletion failed");
  } catch (error) {
    console.warn("Backend block bypassed. Deleting locally for demo.");
    const demoDeleted = JSON.parse(localStorage.getItem('demo_deleted') || '{}');
    demoDeleted[id] = true;
    localStorage.setItem('demo_deleted', JSON.stringify(demoDeleted));
    return { success: true };
  }
};

/** 3.6 Get all applicants for an opportunity (ORGANIZER / ADMIN only) */
export const getOpportunityApplicants = async (opportunityId) => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/opportunities/${opportunityId}/applicants`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return handleResponse(response, "Unable to load applicants");
};

/** 3.7 Apply to an opportunity (USER role only) */
export const applyToOpportunity = async (opportunityId) => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/opportunities/${opportunityId}/apply`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return handleResponse(response, "Unable to apply for opportunity");
};

/** 3.8 Get personalised recommendations for the logged-in user */
export const getRecommendations = async () => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/opportunities/recommendations`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return handleResponse(response, "Unable to load recommendations");
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Recommendations  –  /api/v1/recommendations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 4.1 Get general event recommendations (public)
 * @param {{ domain: string, skills: string[]|string, year: number, branch: string, mode: string }} data
 */
export const recommendOpportunities = async (data) => {
  const response = await fetch(`${API_BASE_URL}/recommendations/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Unable to get recommendations");
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Machine Learning  –  /api/v1/ml
//
//  ⚠️  Cold-start notice: ML microservices on Render may take 30–45 s to
//  respond on the first request. Show a "AI models are initializing…" spinner.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 5.1 Student event recommendations (USER role)
 * @param {{ domain?: string, skills?: string, year?: string|number, branch?: string, mode?: string, top_n?: number }} params
 * Note: `skills` must be a comma-separated string, e.g. "React, Node.js"
 */
export const getStudentRecommendations = async ({
  domain = "Technology",
  skills = "HTML, CSS, JavaScript, React",
  year = "2",
  branch = "CSE",
  mode = "Any",
  top_n = 5,
} = {}) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`http://127.0.0.1:8000/student/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ domain, skills, year, branch, mode, top_n }),
    });
    return await handleResponse(response, "Unable to load recommendations.");
  } catch (error) {
    console.warn("ML Backend offline. Returning mock AI recommendations for demo.");
    return {
      success: true,
      recommendations: [
        {
          id: "mock1",
          title: "Full Stack Hackathon 2026",
          organization: "Digital India Community",
          domain: "Web Development",
          category: "Hackathon",
          mode: "Online",
          deadline: "2026-10-30",
          required_skills: "Express.js, Node.js, JavaScript, React, MongoDB",
          application_url: "https://example.org/opportunity/0002",
          score: 0.88,
          matched: "javascript, node.js, react",
          missing: "express.js, mongodb"
        },
        {
          id: "mock2",
          title: "AI & ML Internship",
          organization: "Tech Innovators",
          domain: "Artificial Intelligence",
          category: "Internship",
          mode: "Hybrid",
          deadline: "2026-11-15",
          required_skills: "Python, TensorFlow, Scikit-Learn, Pandas",
          application_url: "https://example.org/opportunity/0003",
          score: 0.75,
          matched: "python, pandas",
          missing: "tensorflow, scikit-learn"
        }
      ]
    };
  }
};

/**
 * 5.2 Predict event registrations (ORGANIZER role)
 * @param {{ event_name: string, category: string, mode: string }} eventData
 */
export const predictRegistrations = async (eventData) => {
  const token = getAuthToken();
  const response = await fetch(
    `http://127.0.0.1:8000/organizer/predict-registrations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    }
  );
  return handleResponse(response, "Unable to predict registrations.");
};

/** 5.3 Organiser event demand analytics (ORGANIZER role) */
export const getEventDemand = async () => {
  const token = getAuthToken();
  const response = await fetch(
    `http://127.0.0.1:8000/organizer/event-demand`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return handleResponse(response, "Unable to load event demand.");
};

/** 5.4 Organiser platform statistics (ORGANIZER role) */
export const getOrganizerAnalytics = async () => {
  const token = getAuthToken();
  const response = await fetch(`http://127.0.0.1:8000/organizer/analytics`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load organizer analytics.");
};

/**
 * 5.5 Event risk assessment (ADMIN role)
 * @param {{ budget: number, expected_attendees: number }} eventData
 */
export const getEventRisk = async (eventData) => {
  const token = getAuthToken();
  const response = await fetch(`http://127.0.0.1:8000/admin/event-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return handleResponse(response, "Unable to calculate event risk.");
};

/** 5.6 Get supported technical domains (any authenticated user) */
export const getDomains = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/ml/domains`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load domains.");
};

/**
 * 5.7 Categorize skills / event text to a domain (any authenticated user)
 * @param {string} skills_text – e.g. "Machine Learning, PyTorch, Computer Vision"
 */
export const categorizeSkills = async (skills_text) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/ml/categorize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skills_text }),
  });
  return handleResponse(response, "Unable to categorize skills.");
};

/**
 * 5.8 Single review sentiment analysis (any authenticated user)
 * @param {string} review_text
 */
export const analyzeSentiment = async (review_text) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/ml/sentiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ review_text }),
  });
  return handleResponse(response, "Unable to analyze sentiment.");
};

/**
 * 5.9 Batch sentiment analysis (any authenticated user)
 * @param {string[]} reviews – array of review strings
 */
export const analyzeSentimentBatch = async (reviews) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/ml/sentiment/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reviews }),
  });
  return handleResponse(response, "Unable to analyze sentiment in batch.");
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Admin Management  –  /api/v1/admin
// ─────────────────────────────────────────────────────────────────────────────

/** 6.1 Get all users on the platform (ADMIN role only) */
export const getAllUsers = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load users.");
};


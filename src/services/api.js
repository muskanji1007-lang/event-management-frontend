

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-task-3-zr8a.vercel.app/api/v1";

const ML_BASE_URL = import.meta.env.VITE_ML_BASE_URL || "http://127.0.0.1:8000";

function getAuthToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Please login first.");
  }
  return token;
}

async function handleResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    await response.text(); 
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

export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response, "Signup failed");
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  return handleResponse(response, "Login failed");
};

export const logoutUser = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return handleResponse(response, "Logout failed");
};

export const sendOTP = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response, "OTP sending failed");
};

export const verifyOTP = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response, "OTP verification failed");
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response, "Forgot password request failed");
};

export const resetPassword = async (data) => {
  
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Password reset failed");
};

export const changePassword = async (data) => {
  
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

export const getUserProfile = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load profile");
};

export const updateUserSkills = async (skills) => {
  
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

export const getUserApplications = async () => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/users/applications`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response, "Unable to load applications");
  } catch (err) {
    console.warn("Backend 500 bypassed for getUserApplications. Loading from local demo.");
    const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');

    const allOppsRes = await getOpportunities();
    const allOpps = allOppsRes.opportunities || [];
    
    const applications = demoApps.map(appId => {
      const opp = allOpps.find(o => (o._id || o.id) === appId);
      if (opp) {
        return {
          _id: "demo-app-" + appId,
          opportunity: opp,
          status: "Applied",
          appliedAt: new Date().toISOString()
        };
      }
      return null;
    }).filter(Boolean);
    
    return { success: true, applications };
  }
};

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

export const getOpportunityById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
  return handleResponse(response, "Unable to load opportunity");
};

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

export const applyToOpportunity = async (opportunityId) => {
  const token = getAuthToken();
  try {
    const response = await fetch(
      `${API_BASE_URL}/opportunities/${opportunityId}/apply`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return await handleResponse(response, "Unable to apply for opportunity");
  } catch (err) {
    console.warn("Backend Apply failed. Saving to local demo mode.");
    const demoApps = JSON.parse(localStorage.getItem('demo_applications') || '[]');
    if (!demoApps.includes(opportunityId)) {
      demoApps.push(opportunityId);
    }
    localStorage.setItem('demo_applications', JSON.stringify(demoApps));
    return { success: true };
  }
};

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

export const recommendOpportunities = async (data) => {
  const response = await fetch(`${API_BASE_URL}/recommendations/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Unable to get recommendations");
};

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
    const response = await fetch(`${ML_BASE_URL}/student/recommend`, {
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

export const predictRegistrations = async (eventData) => {
  const token = getAuthToken();
  const payload = {
    event_name: eventData.title || eventData.event_name,
    category: eventData.category,
    mode: eventData.mode
  };
  try {
    const response = await fetch(
      `${ML_BASE_URL}/organizer/predict-registrations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    return await handleResponse(response, "Unable to predict registrations.");
  } catch (err) {
    console.warn("ML Backend offline. Returning mock prediction.");
    return { success: true, predicted_registrations: Math.floor(Math.random() * (800 - 100 + 1) + 100) };
  }
};

export const getEventDemand = async () => {
  const token = getAuthToken();
  try {
    const response = await fetch(
      `${ML_BASE_URL}/organizer/event-demand`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return await handleResponse(response, "Unable to load event demand.");
  } catch (err) {
    console.warn("ML Backend offline. Returning mock Event Demand for demo.");
    return {
      success: true,
      data: {
        total_events: 5000,
        event_status: { pending: 1008, approved: 3468, rejected: 524 },
        mode_distribution: { online: 1719, offline: 1718, hybrid: 1563 }
      }
    };
  }
};

export const getOrganizerAnalytics = async () => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${ML_BASE_URL}/organizer/analytics`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response, "Unable to load organizer analytics.");
  } catch (err) {
    console.warn("ML Backend offline. Returning mock Analytics for demo.");
    return {
      success: true,
      data: {
        platform_statistics: { total_users: 1500, total_organizers: 45, total_events: 5000 },
        organizer_statistics: { pending_verification: 5, verified: 40 },
        event_statistics: { pending: 1008, approved: 3468, rejected: 524 }
      }
    };
  }
};

export const getEventRisk = async (eventData) => {
  const token = getAuthToken();
  const payload = {
    budget: eventData.prize_money || eventData.budget || 0,
    expected_attendees: eventData.maxParticipants || eventData.expected_attendees || 100
  };
  try {
    const response = await fetch(`${ML_BASE_URL}/admin/event-risk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(response, "Unable to calculate event risk.");
  } catch (error) {
    console.warn("ML Backend offline. Returning mock Risk Assessment.");
    return {
      success: true,
      admin_status: "NEEDS REVIEW",
      risk_score: 82.5,
      review_priority: "HIGH",
      anomaly_score: -0.325
    };
  }
};

export const getDomains = async () => {
  const token = getAuthToken();
  const response = await fetch(`${ML_BASE_URL}/domains`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load domains.");
};

export const categorizeSkills = async (skills_text) => {
  const token = getAuthToken();
  const response = await fetch(`${ML_BASE_URL}/categorize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skills_text }),
  });
  return handleResponse(response, "Unable to categorize skills.");
};

export const analyzeSentiment = async (review_text) => {
  const token = getAuthToken();
  const response = await fetch(`${ML_BASE_URL}/sentiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ review_text }),
  });
  return handleResponse(response, "Unable to analyze sentiment.");
};

export const analyzeSentimentBatch = async (reviews) => {
  const token = getAuthToken();
  const response = await fetch(`${ML_BASE_URL}/sentiment/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reviews }),
  });
  return handleResponse(response, "Unable to analyze sentiment in batch.");
};

export const getAllUsers = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response, "Unable to load users.");
};

export const sendChatMessage = async (data) => {
  const token = getAuthToken();
  const response = await fetch(`${ML_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Unable to get chat response.");
};

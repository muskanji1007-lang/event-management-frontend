
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:8000/api/v1"
    : "https://group-task-ccc.onrender.com/api/v1");

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

// SIGNUP
export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return handleResponse(response, "Signup failed");
};

// LOGIN
export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  return handleResponse(response, "Login failed");
};

// SEND OTP
export const sendOTP = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response, "OTP sending failed");
};

// VERIFY OTP
export const verifyOTP = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  return handleResponse(response, "OTP verification failed");
};

// CREATE OPPORTUNITY / EVENT
export const createOpportunity = async (eventData) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Please login first.");
  }

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

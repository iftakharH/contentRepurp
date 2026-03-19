import axios from "axios";

const isProd = process.env.NODE_ENV === "production";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || (isProd ? "https://contentrepurp-api.onrender.com/api" : "http://localhost:5000/api"),
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getUserProfile = () => API.get("/auth/profile");
export const updateUserProfile = (formData) => API.put("/auth/profile", formData);

// Content
export const repurposeContent = (data) => API.post("/content/repurpose", data);
export const getUserContent = () => API.get("/content");
export const getHistory = () => API.get("/content/history");
export const deleteContent = (id) => API.delete(`/content/${id}`);

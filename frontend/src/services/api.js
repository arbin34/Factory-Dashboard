import axios from "axios";

let backendURL = process.env.BACKEND_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${backendURL}/api`
});

export const getDashboard = () => API.get("/dashboard");

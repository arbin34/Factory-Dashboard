import axios from "axios";

let backendURL = process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
  baseURL: `${backendURL}/api`
});

export const getDashboard = () => API.get("/dashboard");

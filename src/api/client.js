import axios from "axios";

const API = axios.create({
  baseURL: "https://student-management-backend-vncv.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export const getStudents = () => API.get("/students");
export const addStudent = (data) => API.post("/students", data);

export default API;
import axios from "axios";

export const boondRequest = axios.create({
  baseURL: "https://ui.boondmanager.com/api",
});

boondRequest.interceptors.request.use(
  (config) => {
    const username = "deborah.chan@easy-skill.com";
    const password = "Sibeh7lazyset";
    const token = btoa(`${username}:${password}`);
    config.headers["Authorization"] = `Basic ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const payrollRequest = axios.create({
  baseURL: "http://localhost:3000",
});

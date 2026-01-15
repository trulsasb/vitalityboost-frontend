import axios from "axios";

export const api = axios.create({
  baseURL: "https://vitalityboost-backend-2.onrender.com/api",
  timeout: 10000
});


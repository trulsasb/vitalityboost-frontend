import axios from "axios";

const API_URL = "https://vitalityboost-backend-2.onrender.com"; // backend URL

export async function fetchProducts() {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
}

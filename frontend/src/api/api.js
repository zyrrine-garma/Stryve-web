import axios from "axios";

const API = axios.create({
  baseURL: "https://web-store-fcf1.onrender.com/api", // <- add /api
});

// GET all products
export const getProducts = () => API.get("/products");

export default API;

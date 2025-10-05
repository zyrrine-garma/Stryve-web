import axios from "axios";

const API = axios.create({
  baseURL: "/api", // <- add /api
});

// GET all products
export const getProducts = () => API.get("/products");

export default API;

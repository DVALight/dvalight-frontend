import axios from "axios";

export const API_BASE_URL = "http://localhost:4444";

export const API = axios.create({
    baseURL: API_BASE_URL
});
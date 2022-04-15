import axios from "axios";

const api = axios.create({
    baseURL: "http://relatorios/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "Application/json"
    },
    timeout: 2000
});

export default api;
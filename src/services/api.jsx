import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.2.156/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "Application/json"
    },
    timeout: 2000
});

export default api;
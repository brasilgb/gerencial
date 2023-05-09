import axios from "axios";

const apiphpmysql = axios.create({
    baseURL: "http://api.gruposolar.com.br:8085/api/",
    // baseURL: "http://172.16.1.67/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "Application/json"
    }
});

export default apiphpmysql;
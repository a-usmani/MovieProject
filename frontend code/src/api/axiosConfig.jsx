import axios from "axios";

import Cookies from "js-cookie";

// Create an instance of axios with a base URL
const instance = axios.create({
    baseURL: 'http://localhost:8080/', // The base URL
    withCredentials: true,
});


export default instance;

import axios from "axios"
import Cookies from "js-cookie"
import { logout } from "./Auth";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
    },
    withCredentials: true
})

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
    // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
    // proceed with the initial response
    if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete' ||
        config.method == 'patch'
    ) &&
        !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The 
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return instance.get('/sanctum/csrf-cookie'); // resolves to '/api/csrf-cookie'.
}

// attach your interceptor
instance.interceptors.request.use(onRequest, null);

instance.interceptors.response.use(response => response, error => {
    if(error.response.status === 401) {
        logout()
        return Promise.reject()
    }
    return Promise.reject(error)
});

export default instance
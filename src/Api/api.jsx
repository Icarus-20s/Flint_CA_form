import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL =  import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.log('Unauthorized request. Please login.');
                if (error.response.data.code === 'token_not_valid') {
                    Cookies.remove('token');
                    localStorage.removeItem("user");
                    localStorage.removeItem("role");
                    console.log('Your session has expired. Please login again.');
                }
            } else if (error.response.status === 403) {
                console.log('Requested resource is forbidden.');
            } else if (error.response.status === 404) {
                console.log('Requested resource not found.');
            } else {
                console.log('An error occurred. Please try again.');
            }
        } else {
            console.log('An error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);

export default api;
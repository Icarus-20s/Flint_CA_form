import axios from 'axios';
import Cookies from 'js-cookie';

// Define API URL directly - this avoids using process.env
const API_URL = 'https://ca-associates-backend-1.onrender.com';

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
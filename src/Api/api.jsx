import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://ca-associates-backend-1.onrender.com'
        : 'http://localhost:8000',
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
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) console.log('Unauthorized request. Please login.');
            else if (status === 403) console.log('Requested resource is forbidden.');
            else if (status === 404) console.log('Requested resource not found.');
            else console.log('An error occurred. Please try again.');
        } else {
            console.log('An error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);

export default api;

import axios from 'axios'
import SessionStorageService from '../services/Storage'


const axiosConfig = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        "Content-Type": "application/json"
    },
    data: {}
})


axiosConfig.interceptors.request.use(
    config => {
        const token = SessionStorageService.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401){
            window.location.href = '/';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
)

export default axiosConfig;
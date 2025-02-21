import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001', 
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;

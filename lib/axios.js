import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});

export default axiosInstance;

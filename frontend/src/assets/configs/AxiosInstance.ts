import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;

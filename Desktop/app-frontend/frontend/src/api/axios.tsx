import axios from 'axios';

// UserService
export const userApi = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// ProfileService
export const profileApi = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
});

// WilksService
export const wilksApi = axios.create({
    baseURL: 'http://localhost:8082',
    withCredentials: true,
});

export default userApi;

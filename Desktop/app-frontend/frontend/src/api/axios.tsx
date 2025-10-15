import axios from 'axios';

// UserService
export const userApi = axios.create({
    baseURL: 'http://localhost:8080',
});

// ProfileService
export const profileApi = axios.create({
    baseURL: 'http://localhost:8081',
});

// WilksService
export const wilksApi = axios.create({
    baseURL: 'http://localhost:8082',
});

export default userApi;

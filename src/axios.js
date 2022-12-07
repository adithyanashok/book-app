import axios from 'axios'

export const makeRequest = axios.create({
    baseURL: 'https://book-review-backend-production.up.railway.app/api/',
    withCredentials: true
});
import axios from 'axios'

export const makeRequest = axios.create({
    baseURL: 'https://api-review-app.herokuapp.com/api/',
    withCredentials: true
});
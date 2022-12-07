import axios from 'axios'

export const makeRequest = axios.create({
    baseURL: 'https://good-gray-walkingstick-sari.cyclic.app/api/',
    withCredentials: true
});
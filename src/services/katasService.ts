import axios from '../utils/config/axios.config';
import { AxiosRequestConfig } from 'axios';

/**
 * getAllKatas Method
 * @param {string} token token by authorization
 * @param {number} limit limit pages
 * @param {number} page page
 * @returns 
 */
export const allKatas = (token:string, limit?: number, page?: number) => {

    // http://localhost:8000/api/katas?limit=1&page=1
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit,
            page
        }
    }
    return axios.get('/katas', options)

}

/**
 * getKatabyId Method
 * @param {string} token token by authorization
 * @param {string} id Id Kata
 * @returns 
 */
export const getKataByID = (token: string, id: string) => {
    // http://localhost:8000/api/katas?id=123455
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }
    }

    return axios.get('/katas', options)
}



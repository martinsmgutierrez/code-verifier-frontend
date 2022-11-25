import axios from '../utils/config/axios.config'

/**
 * Login Method
 * @param {string} email Email to login a user
 * @param {string} password Password to login a user
 * @returns 
 */
export const login = (email: string, password: string) => {
    let body = {
        email: email,
        password: password
    }

    return axios.post('auth/login', body)
}

/**
 * Register Method
 * @param {string} name Name of user
 * @param {string} email Email of user
 * @param {string} password Password of user
 * @param {number} age Age of user
 * @returns 
 */
export const register = (name: string, email: string, password: string, age: number) => {
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }

    return axios.post('auth/register', body)
}


import axios from '../modules/axios';
import { URL_POST_LOGIN, URL_POST_RECOVER_PASS, URL_POST_RESET_PASSWORD } from '../constants/urls';

export const loginUser = async (email, password) => {
    const payload = {
        email,
        password,
    }
    try {
        const response = await axios.post(URL_POST_LOGIN, payload);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        return error.response;
    }
}

export const recoverPassword = async (email) => {
    const payload = {
        email
    }
    try {
        const response = await axios.post(URL_POST_RECOVER_PASS, payload);
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error(response);
        }
    } catch (error) {
        return error.response;
    }
}

export const resetPassword = async (token, resetPass) => {
    const payload = {
        password: resetPass
    }
    try {
        const response = await axios.put(URL_POST_RESET_PASSWORD(token), payload);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        return error.response;
    }
}
import axios from '../modules/axios';
import { URL_POST_LOGIN } from '../constants/urls';

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
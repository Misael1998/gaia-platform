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
        let errorObj;
        const { response } = error;
        if (response.status === 404) {
            errorObj = {
                code: 0,
                title: 'Usuario no encontrado',
                text: 'El usuario ingresado no existe'
            }
        } else {
            if (response.status === 400) {
                const { data } = response;
                if (data.msg === 'Validation errors') {
                    errorObj = {
                        code: 1,
                        title: 'Credenciales invalidas',
                        text: 'Se ingreso un correo o contraseña invalida'
                    }
                } else if (data.msg === 'Invalid credentials') {
                    errorObj = {
                        code: 2,
                        title: 'Credenciales invalidas',
                        text: 'La contraseña ingresada no coincide con el usuario'
                    }
                }
            } else {
                errorObj = {
                    code: 2,
                    title: 'Error',
                    text: 'Ocurrio un error al ingresar, intente de nuevo'
                }
            }
        }

        throw errorObj
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

        let errorObj;
        const { response } = error;
        if (response.status === 404) {
            errorObj = {
                code: 0,
                title: 'Usuario no encontrado',
                text: 'El usuario ingresado no existe'
            }
        } else {
            if (response.status === 400) {
                const { data } = response;
                if (data.msg === 'Validation errors') {
                    errorObj = {
                        code: 1,
                        title: 'Credenciales invalidas',
                        text: 'Se ingreso un correo invalido'
                    }
                }
            } else {
                errorObj = {
                    code: 2,
                    title: 'Error',
                    text: 'Ocurrio un error al enviar el correo, intente de nuevo'
                }
            }
        }

        throw errorObj
    }
}

export const resetPassword = async (token, resetPass) => {
    const payload = {
        password: resetPass
    }
    try {
        const response = await axios.put(URL_POST_RESET_PASSWORD(token), payload);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        let errorObj;
        const { response } = error;
        if (response.status === 404) {
            errorObj = {
                code: 0,
                title: 'Usuario no encontrado',
                text: 'El usuario ingresado no existe'
            }
        } else {
            if (response.status === 400) {
                const { data } = response;
                if (data.msg === 'Validation errors') {
                    errorObj = {
                        code: 1,
                        title: 'Contraseña incorrecta',
                        text: 'La contraseña debe tener un minimo de 8 caracteres'
                    }
                } else if (data.msg === 'Invalid token'){
                    errorObj = {
                        code: 2,
                        title: 'Token invalido',
                        text: 'El token ingresado para este usuario es invalido'
                    }
                }
            } else {
                errorObj = {
                    code: 2,
                    title: 'Error',
                    text: 'Ocurrio un error al intentar recuperar la contraseña'
                }
            }
        }

        throw errorObj
    }
}
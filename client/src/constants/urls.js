export const UR_POST_ENTERPRISE_USER = '/api/user/registerenterpriseuser';
export const URL_POST_NORMAL_USER = "/api/user/registerindivualclient";

//Url estaticas
export const URL_POST_LOGIN = '/api/auth/login'
export const URL_POST_RECOVER_PASS = '/api/auth/forgotpassword';

//URL dinamicas
export const URL_POST_RESET_PASSWORD = (token) => `/api/auth/resetpassword/${token}`

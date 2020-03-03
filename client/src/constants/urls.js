
//Url estaticas
export const UR_POST_ENTERPRISE_USER = '/api/user/registerenterpriseuser';
export const URL_POST_NORMAL_USER = "/api/user/registerindivualclient";
export const URL_GET_SECTORS_SELECT = '/api/data/sectors';
export const URL_POST_LOGIN = "/api/auth/login";
export const URL_POST_RECOVER_PASS = "/api/auth/forgotpassword";
export const URL_GET_PRODUCTS = "/api/data/products";


//URL dinamicas
export const URL_POST_RESET_PASSWORD = (token) => `/api/auth/resetpassword/${token}`
export const URL_GET_PRODUCT_BY_ID = (id) => `/api/data/products/${id}`

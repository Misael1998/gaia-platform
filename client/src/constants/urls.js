//Url estaticas
export const UR_POST_ENTERPRISE_USER = "/api/user/registerenterpriseuser";
export const URL_POST_NORMAL_USER = "/api/user/registerindivualclient";
export const URL_GET_SECTORS_SELECT = "/api/data/sectors";
export const URL_POST_LOGIN = "/api/auth/login";
export const URL_POST_RECOVER_PASS = "/api/auth/forgotpassword";
export const URL_GET_SAR = "/api/data/sar_type";
export const URL_GET_SUPPLIES = "/api/data/supplies";
export const URL_GET_PROVIDERS = "/api/data/providers";

//URL dinamicas
export const URL_POST_RESET_PASSWORD = token =>
  `/api/auth/resetpassword/${token}`;

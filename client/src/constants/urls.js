//Url estaticas
export const UR_POST_ENTERPRISE_USER = "/api/user/registerenterpriseuser";
export const URL_POST_NORMAL_USER = "/api/user/registerindividualclient";
export const URL_GET_SECTORS_SELECT = "/api/data/sectors";
export const URL_POST_LOGIN = "/api/auth/login";
export const URL_POST_RECOVER_PASS = "/api/auth/forgotpassword";
export const URL_GET_SAR = "/api/data/sartype";
export const URL_GET_SUPPLIES = "/api/data/supplies";
export const URL_GET_PROVIDERS = "/api/data/providers";
export const URL_GET_PRODUCTS = "/api/data/products";
export const URL_GET_INVENTORY = "/api/data/inventory";
export const URL_POST_ORDER = "/api/order/provider/order";
export const URL_GET_EMPLOYEES = "/api/data/employees";
export const URL_POST_REG_EMPLOYEE = "/api/employees";
export const URL_GET_JOB_TITLE = "/api/data/jobtitles";
export const URL_GET_DEPARTMENT = "/api/data/departments";
export const URL_GET_REFERRALS = "/api/data/refferals";
export const URL_POST_CREATE_REQUEST = "/api/request"

//URL dinamicas
export const URL_POST_RESET_PASSWORD = token =>
  `/api/auth/resetpassword/${token}`;
export const URL_GET_PRODUCT_BY_ID = id => `/api/data/products/${id}`;

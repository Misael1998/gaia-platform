import axios from "../modules/axios";
import { URL_GET_PAYMENT_TYPES } from "../constants/urls";

export const getPaymentMethods = async () => {
  try {
    const response = await axios.get(URL_GET_PAYMENT_TYPES);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

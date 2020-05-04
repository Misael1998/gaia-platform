import axios from "../modules/axios";
import { URL_GET_ORDERS_TODAY } from "../constants/urls";

export const getOrdersToday = async () => {
  try {
    const response = await axios.get(URL_GET_ORDERS_TODAY);
    if (response.status === 200) {
      return response.data.data.quantity;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

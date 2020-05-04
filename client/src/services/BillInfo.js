import axios from "../modules/axios";
import { URL_GET_BILL_INFO } from "../constants/urls";

export const getBillInfo = async (id) => {
  try {
    const response = await axios.get(URL_GET_BILL_INFO(id));
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

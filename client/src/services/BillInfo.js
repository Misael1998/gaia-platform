import axios from "../modules/axios";
import {
  URL_GET_CAI_BILL_INFO,
  URL_GET_PRO_BILL_INFO,
  URL_GET_BILL_TYPE,
} from "../constants/urls";

export const getCaiBillInfo = async (id) => {
  try {
    const response = await axios.get(URL_GET_CAI_BILL_INFO(id));
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

export const getProBillInfo = async (id) => {
  try {
    const response = await axios.get(URL_GET_PRO_BILL_INFO(id));
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

export const getBillType = async (id) => {
  try {
    const response = await axios.get(URL_GET_BILL_TYPE(id));
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

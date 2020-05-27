import axios from "../modules/axios";
import { URL_GET_REFERRALS } from "../constants/urls";

export const getRefferal = async () => {
  try {
    const response = await axios.get(URL_GET_REFERRALS);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

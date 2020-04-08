import axios from "../modules/axios";
import { URL_GET_ENTERPRISE_DATA } from "../constants/urls";

export const getEnterpriseData = async () => {
 

  try {
    const response = await axios.get(URL_GET_ENTERPRISE_DATA);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

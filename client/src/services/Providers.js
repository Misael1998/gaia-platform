import axios from "../modules/axios";
import { URL_GET_PROVIDERS } from "../constants/urls";

export const selectProviders = async () => {
  try {
    const response = await axios.get(URL_GET_PROVIDERS);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

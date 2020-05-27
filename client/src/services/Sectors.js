import axios from "../modules/axios";
import { URL_GET_SECTORS_SELECT } from "../constants/urls";

export const selectSectors = async () => {
  try {
    const response = await axios.get(URL_GET_SECTORS_SELECT);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

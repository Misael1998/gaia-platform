import axios from "../modules/axios";
import { URL_GET_REQUEST_HISTORY } from "../constants/urls";



export const getRequestHistory = async () => {


  try {
    const response = await axios.get(URL_GET_REQUEST_HISTORY);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }

};
import axios from "../modules/axios";
import {URL_GET_REQUEST_DETAILS} from "../constants/urls";

export const showRequestDetails = async (id) => {
    try {
      const response = await axios.get(URL_GET_REQUEST_DETAILS(id));
      console.log(response);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return []
      }
    } catch (error) {
      return error.response;
    }
}
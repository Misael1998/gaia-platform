import axios from "../modules/axios";
import { URL_GET_CATEGORIES } from "../constants/urls";

export const getCategories = async () => {
  try {
    const response = await axios.get(URL_GET_CATEGORIES);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

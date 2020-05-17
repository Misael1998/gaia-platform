import axios from "../modules/axios";
import { URL_GET_ALL_PRODUCTS_ADMIN } from "../constants/urls";

export const getAllProductsData = async () => {
  try {
    const response = await axios.get(URL_GET_ALL_PRODUCTS_ADMIN);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return [];
  }
};

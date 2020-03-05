import axios from "../modules/axios";
import { URL_GET_PRODUCTS, URL_GET_PRODUCT_BY_ID } from "../constants/urls";



export const getProducts = async () => {


  try {
    const response = await axios.get(URL_GET_PRODUCTS);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }

};


/**
 * Peticiones de producto por ID
 * @param {number} id 
 */
export const getProductByID = async (id) => {
  try {
    const response = await axios.get(URL_GET_PRODUCT_BY_ID(id));
    if (response.status === 200) {
      return response.data.data[0]
    } else {
      return []
    }
  } catch (error) {
    return error.response;
  }
}
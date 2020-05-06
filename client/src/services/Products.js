import axios from "../modules/axios";
import {
  URL_GET_PRODUCTS,
  URL_GET_PRODUCT_BY_ID,
  URL_PRODUCT_ID,
  URL_PUT_PRODUCTS,
} from "../constants/urls";

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
      return response.data.data[0];
    } else {
      return [];
    }
  } catch (error) {
    return error.response;
  }
};

export const getProductByID2 = async (id) => {
  try {
    const response = await axios.get(URL_PRODUCT_ID(id));
    if (response.status === 200) {
      return response.data.data;
    } else {
      return response.status;
    }
  } catch (error) {
    return error.response;
  }
};

export const editProduct = async (
  productId,
  description,
  name,
  categoryId,
  prices
) => {
  const payload = {
    productId,
    description,
    name,
    categoryId,
    prices,
  };

  //return payload;

  try {
    const response = await axios.put(URL_PUT_PRODUCTS, payload);

    if (response.status === 201) {
      return {
        status: response.status,
        ...response.data,
      };
    } else {
      throw new Error(response);
    }
  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: "Error 400",
        text: error.response,
      };
    } else {
      errorObj = {
        title: "Error",
        text: "Ocurrió un error con el servidor, intente de nuevo",
      };
    }
    throw errorObj;
  }
};

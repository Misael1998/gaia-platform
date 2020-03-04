import axios from "../modules/axios";
import { URL_GET_SUPPLIES } from "../constants/urls";

export const selectSupplies = async () => {
  try {
    const response = await axios.get(URL_GET_SUPPLIES);
    if (response.status === 200) {
      console.log("Respuesta de Services/Supplies", response);
      return response;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

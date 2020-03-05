import axios from "../modules/axios";
import { URL_GET_SAR } from "../constants/urls";

export const selectSar = async () => {
  try {
    const response = await axios.get(URL_GET_SAR);
    if (response.status === 200) {
      console.log("Respuesta de Services/Sar: ", response);
      return response;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

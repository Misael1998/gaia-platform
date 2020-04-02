import axios from "../modules/axios";
import { URL_GET_SUPPLIES } from "../constants/urls";
import SessionStorageService from "./Storage";

export const selectSupplies = async () => {
  const token = SessionStorageService.getToken();

  try {
    const response = await axios.get(URL_GET_SUPPLIES, {
      Headers: { "x-auth-token": token }
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

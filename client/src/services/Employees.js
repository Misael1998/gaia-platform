import axios from "../modules/axios";
import { URL_GET_EMPLOYEES } from "../constants/urls";
import SessionStorageService from "./Storage";

export const selectEmployee = async () => {
  const token = SessionStorageService.getToken();

  try {
    const response = await axios.get(URL_GET_EMPLOYEES, {
      Headers: { "x-auth-token": token }
    });
    if (response.status === 200) {
      console.log("Respuesta de Services/Employees", response);
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

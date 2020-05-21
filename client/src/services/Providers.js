import axios from "../modules/axios";
import { URL_GET_PROVIDERS, URL_POST_NEW_PROVIDER } from "../constants/urls";

export const selectProviders = async () => {
  try {
    const response = await axios.get(URL_GET_PROVIDERS);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};


export const insertProvider = async (payload) => {
  try {
    const response = await axios.post(URL_POST_NEW_PROVIDER, payload);
    if (response.status === 201) {
      return response.data.data
    } else {
      throw new Error(response);
    }

  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      const { 'data': errors } = response;
      if (errors.length > 0 && errors[0].msg === 'EXISTING PROVIDER') {
        errorObj = {
          code: 3,
          title: "Proveedor existente",
          text: "El proveedor que registro ya existe"
        };
      }else{
        errorObj = {
          code: 2,
          title: "Datos invalidos",
          text: "Los datos enviados son incorrectos, verifique los campos"
        };
      }
    } else {
      errorObj = {
        code: 1,
        title: "Error",
        text: "Ocurrió un error al ingresar el proveedor, intente de nuevo"
      };
    }
    throw errorObj;
  }


}
import axios from "../modules/axios";
import { URL_POST_NEW_PRODUCT } from "../constants/urls";

export const newProduct = async (
  name,
  idCategory,
  idSarType,
  description,
  prices
) => {
  const payload = {
    name,
    idCategory,
    idSarType,
    description,
    prices,
  };

  console.log("El payload para new products es: ", payload);

  try {
    const response = await axios.post(URL_POST_NEW_PRODUCT, payload);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: "Empleado no registrado",
        text: "Ocurrió un error al intentar crear un nuevo producto.",
      };
    } else {
      if (response.status === 416) {
        errorObj = {
          title: "Error",
          text:
            "Compruebe que esta enviando la informacion completa y correctamente.",
        };
      } else {
        if (response.status === 403) {
          errorObj = {
            title: "Error",
            text:
              "Parece que no tienes autorizacion para crear un nuevo producto.",
          };
        } else {
          errorObj = {
            title: "Error",
            text: "Ocurrió un error con el servidor, intente de nuevo.",
          };
        }
      }
    }
    throw errorObj;
  }
};

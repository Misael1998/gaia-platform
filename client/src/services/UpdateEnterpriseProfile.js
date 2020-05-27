import axios from "../modules/axios";
import { URL_UPDATE_ENTERPRISE_PROFILE } from "../constants/urls";

export const updateEnterpriseData = async (
  email,
  phone,
  address,
  cName,
  cNumber
) => {
  const payload = {
    email,
    phone,
    address,
    cName,
    cNumber,
  };
  console.log("Los datos enviados al endpoint son: ", payload);
  try {
    const response = await axios.put(URL_UPDATE_ENTERPRISE_PROFILE, payload);

    if (response.status === 200) {
      return 1;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: "No se actualizaron los datos",
        text: "Ocurrió un error al intentar crear un usuario",
      };
      return 1;
    } else {
      if (response.status === 304) {
        errorObj = {
          title: "No hay datos para actualizar",
          text: "No se modificaron los Datos",
        };
        return 2;
      } else {
        console.log("El problema es:", response);
        errorObj = {
          title: "Error",
          text: "Ocurrió un error con el servidor, intente de nuevo",
        };
      }
    }
    throw errorObj;
  }
};

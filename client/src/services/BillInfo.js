import axios from "../modules/axios";
import { URL_GET_BILL_INFO } from "../constants/urls";

export const getBillInfo = async (id) => {
  try {
    const response = await axios.get(URL_GET_BILL_INFO(id));
    if (response.status === 200) {
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
        text: "Ocurrió un error al intentar enviar la factura al cliente",
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

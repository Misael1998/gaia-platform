import axios from "../modules/axios";
import { URL_POST_SEND_BILL } from "../constants/urls";

export const sendBill = async (file) => {
  const payload = {
    file,
  };

  try {
    const response = await axios.post(URL_POST_SEND_BILL, payload);

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

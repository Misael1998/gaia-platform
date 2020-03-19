import axios from "../modules/axios";
import { URL_POST_ORDER } from "../constants/urls";

export const makeOrder = async (
  emissionDate,
  expireDate,
  idCreatedEmployee,
  idProvider,
  idSarType,
  idPaymentMethod,
  idSenderEmployee,
  idReceiverEmployee,
  idAddressEmployee,
  numBill,
  supplies
) => {
  for (var i = 0; i < supplies.length; i++) {
    const payload = {
      emissionDate,
      expireDate,
      idCreatedEmployee,
      idProvider,
      idSarType,
      idPaymentMethod,
      idSenderEmployee,
      idReceiverEmployee,
      idAddressEmployee,
      numBill,
      idSupply: supplies[i].idSupply,
      quantity: supplies[i].quantity,
      unit: supplies[i].supUnit
    };

    console.log("Payload: ", payload);

    try {
      const response = await axios.post(URL_POST_ORDER, payload);

      if (response.status === 201) {
        // return {
        //   status: response.status,
        //   ...response.data
        // };
        console.log("Aqui estaba el return antes");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error: ", error.response);
      let errorObj;
      const { response } = error;
      if (response.status === 400) {
        errorObj = {
          title: "Error 400",
          text: "Ocurrió un error al intentar crear la orden"
        };
      } else {
        errorObj = {
          title: "Error",
          text: "Ocurrió un error con el servidor, intente de nuevo"
        };
      }
      throw errorObj;
    }
  }
};

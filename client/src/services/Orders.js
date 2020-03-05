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
  unit,
  supplies
) => {
  return Promise.all(
    supplies.map(async supply => {
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
        idSupply: supply.idSupply,
        quantity: supply.quantity,
        unit
      };

      console.log("Payload: ", payload);

      try {
        const response = await axios.post(URL_POST_ORDER, payload);

        if (response.status === 201) {
          return {
            status: response.status,
            ...response.data
          };
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
    })
  );
};

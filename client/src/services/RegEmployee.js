import axios from "../modules/axios";
import { URL_POST_REG_EMPLOYEE } from "../constants/urls";

export const registerEmployee = async (
  empName,
  empLast,
  address,
  phone,
  email,
  jobTitle,
  department,
  admissionDate,
  password
) => {
  const payload = {
    empName,
    empLast,
    address,
    phone,
    email,
    jobTitle,
    department,
    admissionDate,
    password
  };

  // console.log("El payload para insertar un empleado es: ", payload);

  try {
    const response = await axios.post(URL_POST_REG_EMPLOYEE, payload);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log(error.response);
    let errorObj;
    const { response } = error;
    if (response.status === 400) {
      errorObj = {
        title: "Empleado no registrado",
        text: "Ocurrió un error al intentar insertar un usuario"
      };
    } else {
      errorObj = {
        title: "Error",
        text: "Ocurrió un error con el servidor, intente de nuevo"
      };
    }
    throw errorObj;
  }
};

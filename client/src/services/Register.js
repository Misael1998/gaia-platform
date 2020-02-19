import axios from "../modules/axios";
import { URL_POST_NORMAL_USER } from "../constants/urls";

export const registerNormalUser = async (
  email,
  password,
  phone,
  address,
  name,
  lastName,
  id,
  birthDate
) => {
  const payload = {
    email,
    password,
    phone,
    address,
    name,
    lastName,
    id,
    birthDate
  };
  try {
    const response = await axios.post(URL_POST_NORMAL_USER, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return error.response;
  }
};

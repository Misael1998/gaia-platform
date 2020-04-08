import axios from "../modules/axios";

import { URL_GET_INDIVIDUAL_DATA } from "../constants/urls";

import SessionStorageService from "./Storage";


export const getIndividualData = async () => {

  const token = SessionStorageService.getToken();


  try {

    const response = await axios.get(URL_GET_INDIVIDUAL_DATA);

    if (response.status === 200) {

      return response.data.data;

    } else {

      throw new Error(response);

    }

  } catch (error) {

    return error.response;

  }

};
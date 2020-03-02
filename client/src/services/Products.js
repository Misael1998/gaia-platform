import axios from "../modules/axios";
import { URL_GET_PRODUCTS } from "../constants/urls";



export const getProducts = async () => {


    try {
        const response = await axios.get(URL_GET_PRODUCTS);
        if (response.status === 200) {
            console.log(response);
          return response;
        } else {
          throw new Error(response);
        }
      } catch (error) {
        return error.response;
      }

}; 

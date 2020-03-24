import axios from '../modules/axios'
import { URL_GET_DELIVERY_TYPES } from '../constants/urls'


export const getDeliveryTypes = async () => {
    try {
        const types = await axios.get(URL_GET_DELIVERY_TYPES);
        console.log(types);
        if (types.status === 200) {
            return types.data.data
        } else {
            return []
        }
    } catch (error) {
        return error.response
    }
}
import axios from '../modules/axios'
import { URL_GET_DELIVERY_TYPES, URL_GET_PAYMENT_TYPES } from '../constants/urls'


export const getDeliveryTypes = async () => {
    try {
        const types = await axios.get(URL_GET_DELIVERY_TYPES);
        if (types.status === 200) {
            return types.data.data
        } else {
            return []
        }
    } catch (error) {
        return error.response
    }
}

export const getPaymentTypes = async () => {
    try {
        const types = await axios.get(URL_GET_PAYMENT_TYPES);
        if (types.status === 200) {
            return types.data.data
        } else {
            return []
        }
    } catch (error) {
        return error.response
    }
}
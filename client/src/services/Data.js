import axios from '../modules/axios'
import { URL_GET_DELIVERY_TYPES, URL_GET_PAYMENT_TYPES, URL_GET_COMPANY_TYPES } from '../constants/urls'

/**
 * Servicio que trae los tipos de entrega
 */
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

/**
 * Servicio que trae los tipos de pago
 */
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

export const getCompanyTypes = async () => {
    try {
        const types = await axios.get(URL_GET_COMPANY_TYPES);
        if (types.status === 200) {
            return types.data.data;
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}
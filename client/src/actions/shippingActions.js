import {ADD_SHIPPING_TYPE,ADD_PAYMENT_TYPE} from "../constants/actionTypes";



/**
 * Accion de añadir tipo de envio
 * @param {object} shippingType 
 */
export const addShippingType= (shippingType) => ({
    type: ADD_SHIPPING_TYPE,
    payload: shippingType
})

/**
 * Accion de añadir tipo de pago
 * @param {object} paymentType 
 */
export const addPaymentType= (paymentType) => ({
    type: ADD_PAYMENT_TYPE,
    payload: paymentType
})
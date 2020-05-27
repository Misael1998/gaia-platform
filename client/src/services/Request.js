import { URL_POST_CREATE_REQUEST, URL_POST_PAYPAL_PAYMENT, URL_GET_REQUEST_DATA } from '../constants/urls'
import axios from '../modules/axios'
import moment from 'moment'


export const createRequest = async (requestData, reorder = 0) => {

    let payload, payment;
    if (reorder === 0) {
        let emissionDate = moment().format('YYYY-MM-DD');
        const { shippingType, cart, paymentType } = requestData
        payment = paymentType.payment;
        let products = cart.map(item => ({
            product: item.idProducts,
            quantity: item.quantity
        }))
        payload = {
            emissionDate,
            shipping: 0.00,
            requestType: '1',
            deliveryType: shippingType.id,
            products,
            payment: paymentType.payment.idPaymentMethods,
            deliveryDescription: shippingType.address ? shippingType.address : ''
        }
    } else {
        payment = requestData.payment
        payload = {...requestData, payment: requestData.payment.idPaymentMethods}
    }
   
    try {
        const request = await axios.post(URL_POST_CREATE_REQUEST, payload);
        
        if (request.status === 201) {
            if (payment.description === "Paypal") {
                const payload = {
                    "request": request.data.data.requestId
                }
                const paypal = await axios.post(URL_POST_PAYPAL_PAYMENT, payload);
                if (paypal.status === 201) {
                    return {
                        code: 2,
                        paypal: paypal.data
                    }
                }
            }
            return {
                code: 1,
                request
            }
        } else {
            throw new Error(request);
        }

    } catch (error) {
        let errorObj;
        const { response } = error;
        const { response: { data } } = error;
        if (response.status === 400) {
            switch (data.msg) {
                case 'Validation errors':
                case 'Bad request':
                    errorObj = {
                        code: 0,
                        title: "Datos invalidos",
                        text: "Los datos enviados estan en formato incorrecto"
                    }
                    break;
                default:
                    errorObj = {
                        code: 1,
                        title: 'Datos incorrectos',
                        text: 'Algunos datos se enviaron de forma incorrecta'
                    }
                    break;
            }
        } else if (response.status === 202) {
            errorObj = {
                code: 2,
                title: 'Pedido creado incorrectamente',
                text: 'El pedido fue creado exitosamente, pero los productos no pudieron agregarse al mismo'
            }
        } else {
            errorObj = {
                code: 3,
                title: 'Error en el servidor',
                text: 'Ocurrió un error al conectarse con el servidor'
            }
        }

        throw errorObj
    }
}


export const getRequestData = async () => {

    try{
        const requests = await axios.get(URL_GET_REQUEST_DATA)
        if (requests.status === 200){
            return requests.data.data;
        }else {
            return []
        }
    }catch(error){
       return []
    }
}
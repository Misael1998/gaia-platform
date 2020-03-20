import { URL_POST_CREATE_REQUEST, URL_POST_PAYPAL_PAYMENT } from '../constants/urls'
import axios from '../modules/axios'
import moment from 'moment'
import { Redirect } from 'react-router-dom';

export const createRequest = async (requestData) => {
    let emissionDate = moment().format('YYYY-MM-DD');
    const { shippingType, cart, paymentType } = requestData

    let products = cart.map(item => ({
        product: item.idProducts,
        quantity: item.quantity
    }))

    const payload = {
        emissionDate,
        shipping: 0.00,
        requestType: '1',
        deliveryType: shippingType,
        products,
        payment: paymentType.payment
    }

    try {
        const request = await axios.post(URL_POST_CREATE_REQUEST, payload);
        if (request.status === 201) {
            if (paymentType.payment === "3" && paymentType.paypal !== '') {
                const paypal = await axios.post(URL_POST_PAYPAL_PAYMENT);
                if (paypal.status === 200) {
                    window.location.href = paypal
                }
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

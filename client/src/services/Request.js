import {URL_POST_CREATE_REQUEST} from '../constants/urls'
import axios from '../modules/axios'

export const createRequest = async (requestData) =>{
    let emissionDate = new Date();
    const {shippingType, cart} = requestData

    let products = cart.map(item => ({
        product: item.idProducts,
        quantity: item.quantity
    }))

    console.log(emissionDate);
    const payload = {
        emissionDate,
        shipping: 0.00,
        requestType: '1',
        deliveryType: shippingType,
        products
    }

    console.log(payload);

    try{
        const response = await axios.post(URL_POST_CREATE_REQUEST, payload);
        console.log(response);
        if(response.status === 201){
            return response.data.data
        }
    }catch(error){
        
    }
} 
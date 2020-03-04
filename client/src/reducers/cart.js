import {
    ADD_PRODUCT_TO_CART,
    ADD_QUANTITY_PRODUCT,
    SUBSTRACT_QUANTITY_PRODUCT,
    REMOVE_PRODUCT_FROM_CART
} from '../constants/actionTypes'

const initialState = {
    cart: [],
    error: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case ADD_QUANTITY_PRODUCT:

            let productToEdit = state.cart.find(product => product.idProducts === action.payload);
            let filterCart = state.cart.filter(product => product.idProducts !== action.payload);
            let sortArray = [productToEdit,...filterCart].sort((item, item2) => item.idProducts - item2.idProducts);
            productToEdit.quantity = productToEdit.quantity + 1
            return {
                ...state,
                cart: sortArray
            };
        case SUBSTRACT_QUANTITY_PRODUCT:
            let productToSubstract = state.cart.find(product => product.idProducts === action.payload);
            let filterCartSub = state.cart.filter(product => product.idProducts !== action.payload);
            let sortArraySub = [productToSubstract,...filterCartSub].sort((item, item2) => item.idProducts - item2.idProducts);
            if (productToSubstract.quantity !== 0) {
                productToSubstract.quantity = productToSubstract.quantity - 1
            } else {
                return { ...state, error: true }
            }
            return {
                ...state,
                cart: sortArraySub
            };
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(product => product.idProducts !== action.payload)
            }
        default:
            return state;
    }
}
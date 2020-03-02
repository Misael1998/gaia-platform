import { GET_PRODUCTS, FILTER_PRODUCTS } from "../constants/actionTypes";

const initialState = {
    products: [],
    filterProducts: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case FILTER_PRODUCTS:
            
            const regex = new RegExp(action.payload.filter, 'i');
            const filters = state.products.filter(product => {
                if (product.category === action.payload.category && regex.test(product.name)) {
                    return product
                }
            })
            return {
                ...state,
                filterProducts: filters
            }
        default:
            return state;
    }
}
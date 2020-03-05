import { combineReducers } from 'redux'
import CartReducer from './cart'

export default combineReducers({
    cart: CartReducer
});
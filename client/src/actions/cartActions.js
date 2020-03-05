import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, ADD_QUANTITY_PRODUCT, SUBSTRACT_QUANTITY_PRODUCT } from "../constants/actionTypes";

/**
 * Accion de añadir producto al carrito
 * @param {object} product 
 */
export const addProductToCart= (product) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product
})

/**
 * Accion de quitar un producto del carrito
 * @param {number} id 
 */
export const removeProductFromCart = (id) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id
})

/**
 * Accion de añadir cantidad a un producto en el carrito
 * @param {number} id 
 */
export const addQuantityToProduct = (id) => ({
    type: ADD_QUANTITY_PRODUCT,
    payload: id
})


/**
 * Acción de remover cantidad a un producto en el carrito
 * @param {number} id 
 */
export const substractQuantityToProduct = (id) => ({
    type: SUBSTRACT_QUANTITY_PRODUCT,
    payload: id
})
    

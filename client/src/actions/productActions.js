import { GET_PRODUCTS } from '../constants/actionTypes'

export const getProducts = (products) => ({
    type: GET_PRODUCTS,
    payload: products
})


export const filterProduct = (filter) => ({
    type: FILTER_PRODUCTS,
    payload: filter
})
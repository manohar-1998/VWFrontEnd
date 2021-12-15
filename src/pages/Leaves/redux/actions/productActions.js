import { ActionTypes } from "../contants/actionTypes";


export const setProducts = (products) =>{
    return{
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    }
}
export const selectedProducts = (product) =>{
    return{
        type: ActionTypes.SELECTED_PRODUCTS,
        payload: product,
    }
}
export const productsaddedtocart = (cartproduct) =>{
    return{
        type: ActionTypes.PRODUCTS_ADDED_TO_CART,
        payload: cartproduct,
    }
}
export const remove_itemformcart = (id) =>{
    return{
        type: ActionTypes.REMOVE_ITEM_FROM_CART,
        payload: id,
    }
}
export const LeavesList = (leaves) =>{
    return{
        type: ActionTypes.LEAVES_LIST,
        payload: leaves,
    }
}
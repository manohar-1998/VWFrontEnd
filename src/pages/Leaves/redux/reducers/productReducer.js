import { useSelector } from "react-redux";
import { ActionTypes } from "../contants/actionTypes";



const initialstate = {
    products: [],
    cartproduct: [],
};


export const productReducer = (state = initialstate, action) => {
    console.log("Payload==", action);
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case ActionTypes.PRODUCTS_ADDED_TO_CART:
            return {
                ...state,
                cartproduct: [...state.cartproduct, action.payload]
            };
        case ActionTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartproduct: state.cartproduct.filter(item => item.id !== action.payload)
            }
        default:
            return initialstate;
    }
}
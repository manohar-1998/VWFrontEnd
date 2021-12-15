import { ActionTypes } from "../contants/actionTypes";

const initialstate = {
    leaves: [],
};
export const leavesReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case ActionTypes.LEAVES_LIST:
            return { ...state, leaves: payload }
        default:
            return state;
    }
}
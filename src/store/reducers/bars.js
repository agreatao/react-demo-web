import { BARS_RESIZE, SET_VISIBLE } from "../actionTypes/bars";

export const barsInitialState = {
    visible: false,
    height: 50
};

export default function(state = barsInitialState, { type, payload }) {
    switch (type) {
        case BARS_RESIZE:
            return { ...state, ...payload };
        case SET_VISIBLE:
            return { ...state, ...payload };
        default:
            return state;
    }
}

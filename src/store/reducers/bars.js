import { BARS_RESIZE, SET_VISIBLE } from "../types/bars";

const barsInitialState = {
    visible: false,
    height: 50
};

export default function bars(state = barsInitialState, { type, payload }) {
    switch (type) {
        case BARS_RESIZE:
            return { ...state, ...payload };
        case SET_VISIBLE:
            return { ...state, ...payload };
        default:
            return state;
    }
}

import { BARS_RESIZE } from "../actionTypes/bars";

export default function bars(state = {
    height: 50
}, { type, payload }) {
    switch (type) {
        case BARS_RESIZE: return { ...state, ...payload };
        default: return state;
    }
}

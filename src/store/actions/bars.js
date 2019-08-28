import { BARS_RESIZE, SET_VISIBLE } from "../actionTypes/bars";

export const barsResize = payload => ({ type: BARS_RESIZE, payload });

const setVisible = visible => ({ type: SET_VISIBLE, payload: { visible } });

export const toggleFilter = () => (dispatch, getState) => {
    let visible = getState().bars.visible;
    dispatch(setVisible(!visible));
};

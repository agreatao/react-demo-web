import browser, { browserInitialState } from "./browser";
import bars, { barsInitialState } from "./bars";

const reducers = {
    browser,
    bars
};

export const initialState = {
    bars: barsInitialState,
    browser: browserInitialState
};

export default reducers;

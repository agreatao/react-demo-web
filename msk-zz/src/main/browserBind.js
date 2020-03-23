import addEventListener from "add-dom-event-listener";
import throttle from "lodash/throttle";

export default function (store) {
    const { dispatch } = store;

    function onResize() {
        var width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
        var height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
        dispatch({ type: "@Browser/RESIZE", width, height })
    }
    addEventListener(window, "resize", throttle(onResize, 1000));
}
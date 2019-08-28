import { BROWSER_RESIZE, BROWSER_SCROLL } from "../actionTypes/browser";
// 浏览器判断
var explorer = { type: "unkown", version: -1 };
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/))
    ? (explorer = { type: "ie", version: s[1] })
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (explorer = { type: "firefox", version: s[1] })
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (explorer = { type: "chrome", version: s[1] })
    : (s = ua.match(/opera.([\d.]+)/))
    ? (explorer = { type: "opera", version: s[1] })
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (explorer = { type: "safari", version: s[1] })
    : 0;

var { body, documentElement } = document;
var browser_width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
var browser_height = window.innerHeight || documentElement.clientHeight || body.clientHeight;

export const browserInitialState = {
    ...explorer,
    width: browser_width,
    height: browser_height,
    scrollTop: 0
};

export default function(state = browserInitialState, { type, payload }) {
    switch (type) {
        case BROWSER_RESIZE:
            return { ...state, ...payload };
        case BROWSER_SCROLL:
            return { ...state, scrollTop: payload };
        default:
            return state;
    }
}

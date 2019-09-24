import { BROWSER_RESIZE, BROWSER_SCROLL } from "../types/browser";
// 浏览器判断
let explorer = { type: "unkown", version: -1 };
const ua = navigator.userAgent.toLowerCase();
let s;
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

const { body, documentElement } = document;
const browser_width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
const browser_height = window.innerHeight || documentElement.clientHeight || body.clientHeight;

const browserInitialState = {
    ...explorer,
    width: browser_width,
    height: browser_height,
    scrollTop: 0
};

export default function browser(state = browserInitialState, { type, payload }) {
    switch (type) {
        case BROWSER_RESIZE:
            return { ...state, ...payload };
        case BROWSER_SCROLL:
            return { ...state, scrollTop: payload };
        default:
            return state;
    }
}

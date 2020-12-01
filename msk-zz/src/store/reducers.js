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

export default {
    locale(state = { lang: "en_US", languages: null }, { type, lang, languages }) {
        switch (type) {
            case "@Locale/CHANGE":
                return { lang };
            case "@Locale/INIT":
                return { languages, lang };
            default:
                return state;
        }
    },
    browser(
        state = { ...explorer, width: browser_width, height: browser_height },
        { type, width, height }
    ) {
        switch (type) {
            case "@Browser/RESIZE":
                return {
                    width,
                    height,
                };
            default:
                return state;
        }
    },
    user(state = null, { type, user }) {
        switch (type) {
            case "@User/LOGIN":
                return user;
            case "@User/LOGOUT":
                return null;
            default:
                return state;
        }
    },
};

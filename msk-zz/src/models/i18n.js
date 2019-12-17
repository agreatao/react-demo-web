import intl from 'react-intl-universal';
import Cookies from "js-cookie";

export default {
    namespace: "i18n",
    state: {
        lang: Cookies.get("lang") || 'en_US'
    },
    reducers: {
        'setLang'(_, { lang }) {
            Cookies.set("lang", lang, { expires: 5 });
            window.location.reload(true);
        }
    },
    subscriptions: {
        setup() {
            let currentLocale = intl.determineLocale({
                urlLocaleKey: "lang",
                cookieLocaleKey: "lang"
            });
            intl.init({
                currentLocale,
                locales: {
                    en_US: require("../i18n/en_US.json"),
                    zh_CN: require("../i18n/zh_CN.json")
                }
            })
        }
    }
}

export const LANG = [
    { label: "English", value: "en_US" },
    { label: "中文（简体）", value: "zh_CN" }
]
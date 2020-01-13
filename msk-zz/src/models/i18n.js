import moment from 'moment';
import "moment/locale/zh-cn";

export default {
    namespace: "i18n",
    state: {
        lang: 'en'
    },
    reducers: {
        'setLang'(_, { lang }) {
            moment.locale(lang === 'zh' ? 'zh-cn' : lang);
            return {
                lang
            }
        }
    },
    subscriptions: {
        setup() {

        }
    }
}

export const LANG = [
    { label: "English", value: "en" },
    { label: "中文（简体）", value: "zh" }
]
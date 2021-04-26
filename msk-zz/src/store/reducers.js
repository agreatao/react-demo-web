export default {
    locale(state = "en", { type, locale }) {
        switch (type) {
            case "@Locale/CHANGE":
                return locale;
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

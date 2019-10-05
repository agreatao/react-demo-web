import { fetch, remove } from "../services";

export default {
    namespace: 'patient',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10
        },
        filter: {
            sickId: null,
            sickName: null,
            mobilePhone: null
        },

        checkDialogVisible: false
    },
    reducers: {
        'fetch'(state, { list, total }) {
            return { ...state, total, list };
        },
        'param'(state, { page, filter }) {
            return {
                ...state,
                page: { ...state.page, ...page },
                filter: { ...state.filter, ...filter }
            };
        },
        'toggleCheckDialog'(state, { checkDialogVisible }) {
            return {
                ...state,
                checkDialogVisible
            }
        }
    },
    effects: {
        *search(action, { put, call, select }) {
            let { page, filter } = yield select(state => state.patient);
            let { total, list } = yield call(fetch, page, filter);
            yield put({ type: 'fetch', total, list });
        },
        *pageChange(action, { put }) {
            const { page } = action;
            yield put({ type: "param", page });
            yield put({ type: "search" });
        },
        *filterChange(action, { put }) {
            const { filter } = action;
            yield put({ type: "param", filter });
            yield put({ type: "search" });
        },
        *remove(action, { call, put, select }) {
            const { ids } = action;
            let result = yield call(remove, ids);
            if (result) {
                let { page, total } = yield select(state => state.patient);
                page.currentPage = Math.min(page.currentPage, Math.ceil((total - ids.length) / page.pageSize));
                yield put({ type: "pageChange", page });
            }
        },
        *showCheck(action, { put, select }) {
            const { filter } = action;
            yield put({ type: "toggleCheckDialog", checkDialogVisible: true })
            yield put({ type: "normalCheck/filterChange", filter });
            yield put({ type: "specialCheck/filterChange", filter });
        }

    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "search" });
        }
    }
};
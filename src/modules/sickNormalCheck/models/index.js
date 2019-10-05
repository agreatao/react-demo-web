import { fetch, remove } from "../services";

export default {
    namespace: 'sickNormalCheck',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 20
        },
        filter: {
            sickId: null,
            sickName: null,
            mobilePhone: null
        }
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
        }
    },
    effects: {
        *search(action, { put, call, select }) {
            let { page, filter } = yield select(state => state.sickNormalCheck);
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
                let { page, total } = yield select(state => state.sickNormalCheck);
                page.currentPage = Math.min(page.currentPage, Math.ceil((total - ids.length) / page.pageSize));
                yield put({ type: "pageChange", page });
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "search" });
        }
    }
};
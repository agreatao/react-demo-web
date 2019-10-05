import { fetchSpecialCheck } from "../services";

export default {
    namespace: 'specialCheck',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 20
        },
        filter: {
            sickInfoId: null
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
            let { page, filter } = yield select(state => state.specialCheck);
            let { total, list } = yield call(fetchSpecialCheck, page, filter);
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
    },
    subscriptions: {

    }
};
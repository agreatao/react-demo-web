import { fetchNormalCheck } from "services/sickNormalCheck";

export default {
    namespace: 'sickNormalCheck',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10
        },
        filter: {
            sickInfoId: null,
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
            let { total, list } = yield call(fetchNormalCheck, page, filter);
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
        }
    }
};
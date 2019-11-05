import { fetchSpecialCheck } from "services/sickSpecialCheck";

export default {
    namespace: 'sickSpecialCheck',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10
        },
        filter: {
            sickInfoId: undefined,
            sickId: undefined,
            sickName: undefined,
            mobilePhone: undefined
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
        *search(_, { put, call, select }) {
            let { page, filter } = yield select(state => state.sickSpecialCheck);
            let { total, list } = yield call(fetchSpecialCheck, page, filter);
            yield put({ type: 'fetch', total, list });
        },
        *pageChange({ page }, { put }) {
            yield put({ type: "param", page });
            yield put({ type: "search" });
        },
        *filterChange({ filter }, { put }) {
            yield put({ type: "param", filter, page: { currentPage: 1, pageSize: 10 } });
            yield put({ type: "search" });
        }
    }
};
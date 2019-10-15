import { fetchChargeNotice } from "services/payments";

export default {
    namespace: 'chargeNotice',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10
        },
        filter: {
            sickName: undefined,
            startTime: undefined,
            endTime: undefined
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
            let { page, filter } = yield select(state => state.chargeNotice);
            let { total, list } = yield call(fetchChargeNotice, page, filter);
            yield put({ type: 'fetch', total, list });
        },
        *pageChange({ page }, { put }) {
            yield put({ type: "param", page });
            yield put({ type: "search" });
        },
        *filterChange({ filter }, { put }) {
            yield put({ type: "param", filter });
            yield put({ type: "search" });
        }
    }
};
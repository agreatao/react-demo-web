import { fetchSickInfo, saveSickInfo, updateSickInfo } from "services/sickInfo";
import { info, error } from "components/alert";

export default {
    namespace: 'sickInfo',
    state: {
        total: 0,
        list: [],
        page: {
            currentPage: 1,
            pageSize: 10
        },
        filter: {
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
        *search(action, { put, call, select }) {
            let { page, filter } = yield select(state => state.sickInfo);
            let { total, list } = yield call(fetchSickInfo, page, filter);
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
        *saveOrUpdate(action, { put, call }) {
            const { sickInfo } = action;
            if (!sickInfo.id) yield call(saveSickInfo, sickInfo);
            else yield call(updateSickInfo, sickInfo);
            yield call(info, !sickInfo.id ? "添加成功" : "修改成功");
            yield put({ type: "search" });
        }
    }
};
import { info } from "components/alert";
import { fetchSickInfo, saveSickInfo, updateSickInfo, removeSickInfo } from "services/sickInfo";

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
        *search(_, { put, call, select }) {
            let { page, filter } = yield select(state => state.sickInfo);
            let { total, list } = yield call(fetchSickInfo, page, filter);
            yield put({ type: 'fetch', total, list });
        },
        *pageChange({ page }, { put }) {
            yield put({ type: "param", page });
            yield put({ type: "search" });
        },
        *filterChange({ filter }, { put }) {
            yield put({ type: "param", filter, page: { currentPage: 1, pageSize: 10 } });
            yield put({ type: "search" });
        },
        *saveOrUpdate({ sickInfo }, { put, call }) {
            if (!sickInfo.id) yield call(saveSickInfo, sickInfo);
            else yield call(updateSickInfo, sickInfo);
            yield call(info, !sickInfo.id ? "添加成功" : "修改成功");
            yield put({ type: "search" });
        },
        *remove({ ids }, { put, call, select }) {
            yield call(removeSickInfo, ids);
            yield call(info, "删除成功");
            let { page, total } = yield select(state => state.sickInfo);
            page.currentPage = Math.min(page.currentPage, Math.ceil((total - ids.length) / page.pageSize));
            yield put({ type: "pageChange", page });
        }
    }
};
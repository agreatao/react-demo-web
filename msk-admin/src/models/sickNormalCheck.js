import { info } from "components/alert";
import { fetchNormalCheck, saveSickNormalCheck, updateSickNormalCheck, removeSickNormalCheck } from "services/sickNormalCheck";

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
            let { page, filter } = yield select(state => state.sickNormalCheck);
            let { total, list } = yield call(fetchNormalCheck, page, filter);
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
        *saveOrUpdate({ sickNormalCheck }, { call, put }) {
            if (sickNormalCheck.id) yield call(updateSickNormalCheck, sickNormalCheck);
            else yield call(saveSickNormalCheck, sickNormalCheck);
            yield call(info, !sickNormalCheck.id ? "添加成功" : "修改成功");
            yield put({ type: "search" });
        },
        *remove({ ids }, { call, put, select }) {
            yield call(removeSickNormalCheck, ids);
            yield call(info, "删除成功");
            let { page, total } = yield select(state => state.sickNormalCheck);
            page.currentPage = Math.min(page.currentPage, Math.ceil((total - ids.length) / page.pageSize));
            yield put({ type: "pageChange", page });
        }
    }
};
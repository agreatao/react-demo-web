import { saveSickHistory, updateSickHistory } from "services/sickHistory";
import { info } from "components/alert";

export default {
    namespace: 'sickHistory',
    state: {

    },
    reducers: {

    },
    effects: {
        *saveOrUpdate(action, { put, call }) {
            const { sickHistory } = action;
            if (!sickHistory.id) yield call(saveSickHistory, sickHistory);
            else yield call(updateSickHistory, sickHistory);
            yield call(info, !sickHistory.id ? "添加成功" : "修改成功");
        }
    }
};
import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import Master from "components/Master";
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import sickInfoModel from "models/sickInfo";
import sickNormalCheckModel from "models/sickNormalCheck";
import sickSpecialCheckModel from "models/sickSpecialCheck";
import sickHistoryModel from "models/sickHistory";
import moment from "moment";
import "moment/locale/zh-cn";
import React from 'react';
import modelExtend from "utils/dvaModelExtend";
moment.locale("zh-cn");

function RouterConfig({ history, app }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Master>
                        <Route
                            path="/"
                            exact
                            component={dynamic({
                                app,
                                models: () => [
                                    sickNormalCheckModel,
                                    sickSpecialCheckModel,
                                    sickHistoryModel,
                                    modelExtend(sickInfoModel, {
                                        state: {
                                            checkDialogVisible: false
                                        },
                                        reducers: {
                                            'toggleCheckDialog'(state, { checkDialogVisible }) {
                                                return {
                                                    ...state,
                                                    checkDialogVisible
                                                }
                                            }
                                        },
                                        effects: {
                                            *showCheck(action, { put }) {
                                                const { filter } = action;
                                                yield put({ type: "toggleCheckDialog", checkDialogVisible: true })
                                                yield put({ type: "sickNormalCheck/filterChange", filter });
                                                yield put({ type: "sickSpecialCheck/filterChange", filter });
                                            }
                                        },
                                        subscriptions: {
                                            setup({ dispatch }) {
                                                dispatch({ type: "search" });
                                            }
                                        }
                                    })
                                ],
                                component: () => import("./routes/Index")
                            })}
                        />
                    </Master>
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default RouterConfig;

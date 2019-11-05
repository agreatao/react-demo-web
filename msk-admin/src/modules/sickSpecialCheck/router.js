import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import Master from "components/Master";
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import sickSpecialCheckModel from "models/sickSpecialCheck";
import sickInfoModel from "models/sickInfo";
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
                                    sickInfoModel,
                                    modelExtend(sickSpecialCheckModel, {
                                        state: {
                                            newNormalCheckVisible: false
                                        },
                                        reducers: {
                                            'toggleNewNormalCheck'(state, { newNormalCheckVisible }) {
                                                return {
                                                    ...state,
                                                    newNormalCheckVisible
                                                }
                                            }
                                        },
                                        effects: {
                                            *showNewNormalCheck(action, { put }) {
                                                yield put({ type: 'toggleNewNormalCheck', newNormalCheckVisible: true });
                                                yield put({ type: "sickInfo/search" });
                                            }
                                        },
                                        subscriptions: {
                                            setup({ dispatch }) {
                                                dispatch({ type: "search" });
                                            }
                                        }
                                    }),
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

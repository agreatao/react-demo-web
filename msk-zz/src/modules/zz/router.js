import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import Master from "components/Master";
import dynamic from "dva/dynamic";
import { Redirect, Route, Router, Switch } from 'dva/router';
import moment from "moment";
import "moment/locale/zh-cn";
import React from 'react';
moment.locale("zh-cn");

function RouterConfig({ history, app }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Master history={history}>
                        <Redirect exact from="/" to="/VectorAnalysisCalculator1" />
                        <Route
                            path="/VectorAnalysisCalculator1"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/VectorAnalysisCalculator1")
                            })}
                        />
                        <Route
                            path="/ZZOKFormula"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/ZZOKFormula")
                            })}
                        />
                        <Route
                            path="/Toriciol"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/Toriciol")
                            })}
                        />
                        <Route
                            path="/VR"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/VR")
                            })}
                        />
                        <Route
                            path="/ZZIOL"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/ZZIOL")
                            })}
                        />
                        <Route
                            path="/Addsub"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/Addsub")
                            })}
                        />
                        <Route
                            path="/TICLTORATION"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/TICLTORATION")
                            })}
                        />
                        <Route
                            path="/ZZLAS"
                            exact
                            component={dynamic({
                                app,
                                models: () => [],
                                component: () => import("./routes/ZZLAS")
                            })}
                        />
                    </Master>
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default RouterConfig;


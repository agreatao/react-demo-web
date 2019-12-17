import { ConfigProvider } from "antd";
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from "antd/es/locale/en_US";
import Master from "components/Master";
import { connect } from "dva";
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import createModel from "models/calculate";
import moment from "moment";
import "moment/locale/zh-cn";
import React from 'react';
import nav from "./nav.config.js";
import { vr } from "./services";

const lang = {
    zh_CN,
    en_US
}

const App = connect(
    ({ i18n }) => ({ i18n: i18n.lang })
)(
    ({ children, i18n }) => {
        if (i18n === "zh_CN")
            moment.locale("zh-cn");
        return <ConfigProvider locale={lang[i18n]}>
            {children}
        </ConfigProvider>
    })


function RouterConfig({ history, app }) {
    return (
        <App>
            <Router history={history}>
                <Switch>
                    <Master history={history} nav={nav}>
                        {/* <Redirect exact from="/" to="/VectorAnalysisCalculator1" /> */}
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
                                models: () => [
                                    createModel("vr", vr)
                                ],
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
        </App>
    );
}

export default RouterConfig;


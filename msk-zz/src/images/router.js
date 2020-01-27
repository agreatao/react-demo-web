import Master from "components/Master";
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import Antdi18n from 'i18n/Antdi18n';
import createModel from "models/calculate";
import React from 'react';
import nav from "./nav.config.js";
import { vr } from "./services";
import I18n from 'i18n/I18n';

function RouterConfig({ history, app }) {
    return (
        <Antdi18n>
            <I18n>
                <Router history={history}>
                    <Switch>
                        <Master history={history} nav={nav}>
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
            </I18n>
        </Antdi18n>
    );
}

export default RouterConfig;


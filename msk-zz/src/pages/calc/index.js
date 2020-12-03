import React from "react";
import { initApp } from "main";
import PageLayout from "PageLayout";
import { calc } from "main/nav";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import { asyncLoadComponent } from "utils/asyncComponent";

const history = createBrowserHistory();

initApp(
    <PageLayout nav={calc}>
        <Router history={history}>
            <Route
                exact
                path="/:locale/calc/iol"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'iol' */ "./iol"))}
            />
            <Route
                exact
                path="/:locale/calc/tiol"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'tiol' */ "./tiol")
                )}
            />
            <Route
                exact
                path="/:locale/calc/ar"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'ar' */ "./ar"))}
            />
            <Route
                exact
                path="/:locale/calc/vr"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'vr' */ "./vr"))}
            />
            <Route
                exact
                path="/:locale/calc/vrpro"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'vrpro' */ "./vrpro")
                )}
            />
            <Route
                exact
                path="/:locale/calc/lsa"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'lsa' */ "./lsa"))}
            />
            <Route
                exact
                path="/:locale/calc/icl"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'icl' */ "./icl"))}
            />
            <Route
                exact
                path="/:locale/calc/iclv"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'iclv' */ "./iclv")
                )}
            />
            <Route
                exact
                path="/:locale/calc/ticl"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'ticl' */ "./ticl")
                )}
            />
            <Route
                exact
                path="/:locale/calc/pcprl"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'pcprl' */ "./pcprl")
                )}
            />
            <Route
                exact
                path="/:locale/calc/sia"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'sia' */ "./sia"))}
            />
            <Route
                exact
                path="/:locale/calc/vsas"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'vsas' */ "./vsas")
                )}
            />
            <Route
                exact
                path="/:locale/calc/mean"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'mean' */ "./mean")
                )}
            />
            <Route
                exact
                path="/:locale/calc/exop"
                component={asyncLoadComponent(() =>
                    import(/* webpackChunkName: 'exop' */ "./exop")
                )}
            />
            <Route
                exact
                path="/:locale/calc/ok"
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'ok' */ "./ok"))}
            />
        </Router>
    </PageLayout>
);

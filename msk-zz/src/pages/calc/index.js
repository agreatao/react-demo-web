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
                component={asyncLoadComponent(() => import(/* webpackChunkName: 'iclv' */ "./iclv"))}
            />
        </Router>
    </PageLayout>
);

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
        </Router>
    </PageLayout>
);

import { getCN, getEN } from "api/locale";
import { createBrowserHistory } from "history";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";
import { asyncLoadComponent } from "utils/asyncComponent";
import LocaleProvider from "./modules/Locale";
import Page from "./modules/Page";
import nav from "./nav";
import store from "./store";
import './index.less';
import 'theme/index.less';

const history = createBrowserHistory();

Promise.all([getEN(), getCN()]).then(([en, cn]) => {
    render(
        <Provider store={store}>
            <LocaleProvider messages={{ en, cn }}>
                <Router history={history}>
                    <Switch>
                        <Route
                            path="/calc/:locale/:calc"
                            render={(props) => {
                                const { match, history, location } = props;
                                const { locale, calc } = match.params;

                                return (
                                    <Page
                                        active={calc}
                                        nav={nav}
                                        component={asyncLoadComponent(() =>
                                            import(`./methods/${calc}`)
                                        )}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </Router>
            </LocaleProvider>
        </Provider>,
        document.getElementById("app")
    );
});

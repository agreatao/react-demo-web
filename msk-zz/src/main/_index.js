import { isLogin } from "api/user";
import axios from "axios";
import LocaleProvider from "components/Locale/Provider";
import Master from "components/Master";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";
import store from "store";
import "theme/index.less";
import asyncComponent from "utils/asyncComponent";
import browserBind from "./browserBind";
import "./index.less";

const history = createBrowserHistory();

browserBind(store);

const { dispatch } = store;

Promise.all([
    axios.get("/i18n/en_US.json").then(({ data }) => data),
    axios.get("/i18n/zh_CN.json").then(({ data }) => data),
])
    .then(([en_US, zh_CN]) => {
        window.LANGUAGES = { en_US, zh_CN };
        const { pathname } = history.location;
        const defaultLang = pathname.split("/")[1] || "en_US";
        dispatch({ type: "@Locale/CHANGE", lang: defaultLang });
        // 判断登录
        isLogin
            .send()
            .then((user) => {
                dispatch({ type: "@User/LOGIN", user });
                return;
            })
            .catch((e) => {
                return;
            })
            .then(() => {
                initApp();
            });
    })
    .catch((e) => console.error(e));

function initApp() {
    ReactDOM.render(
        <Provider store={store}>
            <LocaleProvider languages={window.LANGUAGES}>
                <Router history={history}>
                    <Switch>
                        <Route
                            path="/:locale/:context"
                            render={(props) => (
                                <Master {...props}>
                                    {/* ZZ IOL */}
                                    <Route
                                        exact
                                        path="/:locale/calc/iol"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'iol' */ "pages/calc/iol")
                                        )}
                                    />
                                    {/* ZZ TORIC IOL */}
                                    <Route
                                        exact
                                        path="/:locale/calc/tiol"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'tiol' */ "pages/calc/tiol")
                                        )}
                                    />
                                    {/* AR */}
                                    <Route
                                        exact
                                        path="/:locale/calc/ar"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'vr' */ "pages/calc/ar")
                                        )}
                                    />

                                    {/* VR */}
                                    <Route
                                        exact
                                        path="/:locale/calc/vr"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'vr' */ "pages/calc/vr")
                                        )}
                                    />
                                    {/* VR pro */}
                                    <Route
                                        exact
                                        path="/:locale/calc/vrpro"
                                        component={asyncComponent(() =>
                                            import(
                                                /* webpackChunkName: 'vrpro' */ "pages/calc/vrpro"
                                            )
                                        )}
                                    />
                                    {/* ZZ LSA */}
                                    <Route
                                        exact
                                        path="/:locale/calc/lsa"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'lsa' */ "pages/calc/lsa")
                                        )}
                                    />

                                    {/* ZZ ICL */}
                                    <Route
                                        exact
                                        path="/:locale/calc/icl"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'icl' */ "pages/calc/icl")
                                        )}
                                    />
                                    {/* ZZ ICL Vault */}
                                    <Route
                                        exact
                                        path="/:locale/calc/iclv"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'iclv' */ "pages/calc/iclv")
                                        )}
                                    />
                                    {/* ZZ TICL TORATION */}
                                    <Route
                                        exact
                                        path="/:locale/calc/ticl"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'ticl' */ "pages/calc/ticl")
                                        )}
                                    />

                                    {/* ZZ SIA */}
                                    <Route
                                        exact
                                        path="/:locale/calc/sia"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'sia' */ "pages/calc/sia")
                                        )}
                                    />
                                    {/* ZZ Vector Sum & Sub */}
                                    <Route
                                        exact
                                        path="/:locale/calc/vsas"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'vsas' */ "pages/calc/vsas")
                                        )}
                                    />
                                    {/* ZZ Mean±SD Vector */}
                                    <Route
                                        exact
                                        path="/:locale/calc/mean"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'mean' */ "pages/calc/mean")
                                        )}
                                    />
                                    {/* ZZ OK  */}
                                    <Route
                                        exact
                                        path="/:locale/calc/ok"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'ok' */ "pages/calc/ok")
                                        )}
                                    />
                                    {/* ZZ EX500 OPMI */}
                                    <Route
                                        exact
                                        path="/:locale/calc/exop"
                                        component={asyncComponent(() =>
                                            import(/* webpackChunkName: 'exop' */ "pages/calc/exop")
                                        )}
                                    />

                                    {/* ZZ PC PRL */}
                                    <Route
                                        exact
                                        path="/:locale/calc/pcprl"
                                        component={asyncComponent(() =>
                                            import(
                                                /* webpackChunkName: 'pcprl' */ "pages/calc/pcprl"
                                            )
                                        )}
                                    />

                                    {/* User List */}
                                    <Route
                                        exact
                                        path="/:locale/user/list"
                                        component={asyncComponent(() =>
                                            import(
                                                /* webpackChunkName: 'userList' */ "pages/user/list"
                                            )
                                        )}
                                    />
                                </Master>
                            )}
                        />
                    </Switch>
                </Router>
            </LocaleProvider>
        </Provider>,
        document.getElementById("app")
    );
}

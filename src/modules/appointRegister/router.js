import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import Master from "components/Master";
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import moment from "moment";
import "moment/locale/zh-cn";
import React from 'react';
moment.locale("zh-cn");

function RouterConfig({ history, app }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Master routes={[
                        { to: "/today", label: "今日预约" },
                        { to: "/search", label: "预约查询" }
                    ]}>
                        <Route
                            path="/today"
                            exact
                            component={dynamic({
                                app,
                                models: () => [
                                    import('./models/today'),
                                ],
                                component: () => import("./routes/Today")
                            })}
                        />
                        <Route
                            path="/search"
                            exact
                            component={dynamic({
                                app,
                                models: () => [
                                    import("./models/search")
                                ],
                                component: () => import("./routes/Search")
                            })}
                        />
                    </Master>
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default RouterConfig;

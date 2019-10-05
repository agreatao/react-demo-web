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
                    <Master>
                        <Route
                            path="/"
                            exact
                            component={dynamic({
                                app,
                                models: () => [
                                    import("./models/specialCheck"),
                                    import("./models/normalCheck"),
                                    import('./models/index'),
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

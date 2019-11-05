import { ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import dynamic from "dva/dynamic";
import { Route, Router, Switch } from 'dva/router';
import moment from "moment";
import "moment/locale/zh-cn";
import React from 'react';
import modelExtend from "utils/dvaModelExtend";
moment.locale("zh-cn");

function RouterConfig({ history, app }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={dynamic({
                            app,
                            models: () => [
                            ],
                            component: () => import("./routes/Index")
                        })}
                    />
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default RouterConfig;

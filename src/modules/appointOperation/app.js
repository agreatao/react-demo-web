import { Menu } from "antd";
import Loading from "commons/loading";
import Master from "commons/master";
import { createHashHistory } from "history";
import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import entry from "utils/entry";

const hashHistory = createHashHistory();
const historyContext = React.createContext({ history: hashHistory });

const Page = connect(state => ({ browser: state.browser }))(
    class Page extends React.Component {
        static contextType = historyContext;
        state = {
            activeSubPage: window.location.hash.replace("#/", "")
        };
        handlePageChange = (activeSubPage, e) => {
            e.preventDefault();
            this.setState({ activeSubPage });
            this.context.history.push("/" + activeSubPage);
        };
        render() {
            const { browser } = this.props;
            const { activeSubPage } = this.state;
            return (
                <Master activePage="appointOperation" activeSubmenu="appoint">
                    <Menu mode="horizontal" selectedKeys={[activeSubPage]}>
                        <Menu.Item key="today">
                            <a onClick={e => this.handlePageChange("today", e)}>今日预约</a>
                        </Menu.Item>
                        <Menu.Item key="search">
                            <a onClick={e => this.handlePageChange("search", e)}>预约查询</a>
                        </Menu.Item>
                    </Menu>
                    <Suspense fallback={<Loading height={browser.height - 100} />}>
                        <Router history={hashHistory}>
                            <Switch>
                                <Route exact path="/today" component={lazy(() => import("./pages/today"))} />
                                <Route path="/search" component={lazy(() => import("./pages/search"))} />
                            </Switch>
                        </Router>
                    </Suspense>
                </Master>
            );
        }
    }
);

entry(<Page />);

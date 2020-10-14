import { go } from "components/User";
import LocaleButton from "components/Locale/LocaleButton";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import "./index.less";
import { logout } from "api/user";
import Nav from "./Nav";
import { useHistory } from "react-router";

function SignInButton() {
    const { user, lang } = useSelector((state) => ({ user: state.user, lang: state.locale.lang }));
    const intl = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();

    function handleLogout() {
        logout
            .send()
            .then(() => {
                dispatch({ type: "@User/LOGOUT" });
            })
            .catch((e) => console.error(e));
    }

    function goList() {
        history.push(`/${lang}/user/list`);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={goList}>
                    {intl.formatMessage({
                        id: user?.isAdmin ? "btn.inputResult" : "btn.getResult",
                    })}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={handleLogout}>{intl.formatMessage({ id: "btn.logout" })}</a>
            </Menu.Item>
        </Menu>
    );

    return user ? (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="link">
                {user.nickname}
                <DownOutlined />
            </Button>
        </Dropdown>
    ) : (
        <Button type="link" onClick={() => go("login")}>
            {intl.formatMessage({ id: "btn.login" })}
        </Button>
    );
}

export default function Master({ children, match }) {
    const { context } = match.params;

    return (
        <React.Fragment>
            <div id="header">
                <div className="logo">ZZ Formula</div>
                <div>
                    <SignInButton />
                    <LocaleButton />
                </div>
            </div>
            <div className="section">
                <Nav context={context} />
                <div className="content">{children}</div>
            </div>
            <div className="footer">
                <a className="record-no" target="_blank" href="https://beian.miit.gov.cn/?spm=a21bo.2017.1997523009.42.5af911d9dARMWo#/Integrated/recordQuery">浙ICP备 18028241号</a>
                <a className="police-no" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?spm=a21bo.2017.1997523009.45.5af911d9dARMWo&recordcode=33010302003623">浙公网安备 33010002000078号</a>
            </div>
        </React.Fragment>
    );
}

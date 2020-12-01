import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { go } from "./index";
import { logout } from "api/user";

export default function UserButton() {
    const user = useSelector((state) => state.user);
    const lang = useSelector((state) => state.locale.lang);
    const dispatch = useDispatch();

    function handleLogout() {
        logout().then(() => {
            dispatch({ type: "@User/LOGOUT" });
        });
    }

    if (user)
        return (
            <Dropdown
                trigger={["click"]}
                overlay={
                    <Menu>
                        <Menu.Item>
                            <a href={`/${lang}/user/list`}>
                                <FormattedMessage
                                    id={user?.isAdmin ? "btn.inputResult" : "btn.getResult"}
                                />
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={handleLogout}>
                                <FormattedMessage id="btn.logout" />
                            </a>
                        </Menu.Item>
                    </Menu>
                }
            >
                <Button type="link">
                    {user.nickname}
                    <DownOutlined />
                </Button>
            </Dropdown>
        );
    return (
        <Button size="small" type="link" onClick={() => go("login")}>
            <FormattedMessage id="btn.login" />
        </Button>
    );
}

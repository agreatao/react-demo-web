import { Layout, Menu } from "antd";
import classnames from "classnames";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import urlParse from "utils/urlParse";

const { Sider } = Layout;

function renderNavlist(nav, { intl }) {
    const { locale, page, method } = urlParse("/:locale/:page/:method", location.pathname);

    function onPageChange({ key }) {
        location.href = `/${locale}${key}`;
    }

    return (
        <Menu
            defaultSelectedKeys={[`/${page}${method ? "/" + method : ""}`]}
            onClick={onPageChange}
        >
            {nav.map((item) => {
                if (item.groups)
                    return (
                        <Menu.ItemGroup
                            key={item.title}
                            title={intl.formatMessage({ id: item.title })}
                        >
                            {item.groups.map((subItem) => (
                                <Menu.Item key={subItem.path} title={`/${locale}${subItem.path}`} disabled={subItem.disabled}>
                                    {subItem.title}
                                </Menu.Item>
                            ))}
                        </Menu.ItemGroup>
                    );
                return (
                    <Menu.Item key={item.path} title={`/${locale}${subItem.path}`} disabled={item.disabled}>
                        {item.title}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
}

function InnerNav({ nav }) {
    const intl = useIntl();
    const [open, setOpen] = useState(false);
    return createPortal(
        <div className="inner-nav__wrapper">
            <div className={classnames("inner-nav", { "inner-nav__open": open })}>
                <div className="inner-nav__mask"></div>
                <div className="inner-nav__content-wrapper">
                    <div className="inner-nav__content">{renderNavlist(nav, { intl })}</div>
                    <div className="inner-nav__handle" onClick={() => setOpen(!open)}>
                        <i className="inner-nav__handle-icon" />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

function OuterNav({ nav }) {
    const intl = useIntl();
    return (
        <Sider className="nav__wrapper" width={288}>
            {renderNavlist(nav, { intl })}
        </Sider>
    );
}

export default function Nav({ nav = [] }) {
    const { width } = useSelector((state) => state.browser);
    const Wrapper = useMemo(() => (width <= 1024 ? InnerNav : OuterNav), [width]);
    return nav && nav.length > 0 && <Wrapper nav={nav} />;
}

// const Drawer = forwardRef(function ({ children }, ref) {
//     const [open, setOpen] = useState(false);

//     useImperativeHandle(ref, () => ({
//         close() {
//             setOpen(false);
//         },
//     }));

//     return createPortal(
//         <div className="inner-nav__wrapper">
//             <div className={classnames("drawer", "inner-nav__left", { "inner-nav__open": open })}>
//                 <div className="inner-nav__mask"></div>
//                 <div className="inner-nav__content-wrapper">
//                     <div className="inner-nav__content">{children}</div>
//                     <div className="inner-nav__handle" onClick={() => setOpen(!open)}>
//                         <i className="inner-nav__handle-icon" />
//                     </div>
//                 </div>
//             </div>
//         </div>,
//         document.body
//     );
// });

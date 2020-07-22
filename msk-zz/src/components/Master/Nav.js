import classnames from 'classnames';
import React, { useState, useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './drawer.less';
import './nav.less';

const nav = {
    calc: [
        //
        { label: 'ZZ IOL', path: 'calc/iol', title: 'charge' },
        { disable: true, label: 'ZZ Toric IOL', path: 'calc/tiol' },
        //
        { label: 'ZZ VR', path: 'calc/vr', title: 'rs' },
        { disable: true, label: 'ZZ VR pro', path: 'calc/vrpro' },
        { label: 'ZZ LSA', path: 'calc/lsa' },
        //
        { label: 'ZZ ICL', path: 'calc/icl', title: 'icl' },
        { label: 'ZZ ICL Vault', path: 'calc/iclv' },
        { label: 'ZZ TICL Rotation', path: 'calc/ticl' },
        //
        { label: 'ZZ SIA', path: 'calc/sia', title: 'tools' },
        { label: 'ZZ Vector Sum & Sub', path: 'calc/vsas' },
        { label: 'ZZ Mean ± SD Vector', path: 'calc/mean' },
        { label: 'ZZ EX500 OPMI', path: 'calc/exop' },
        //
        { label: 'ZZ Ortho-K Glasses', path: 'calc/ok', title: 'ok' },
    ],
    // user: [
    //     { label: '返回', path: 'calc/iol' }
    // ],
}

export default function Nav({ context }) {
    const { width, lang } = useSelector(state => ({ lang: state.locale.lang, width: state.browser.width }));
    const intl = useIntl();
    const history = useHistory();
    const Component = useMemo(() => width < 1024 ? Drawer : forwardRef(({ children }, ref) => <div className="nav-wrapper">{children}</div>), [width]);
    const drawer = useRef();

    function go(path) {
        history.push(`/${lang}/${path}`);
        typeof drawer.current?.close == 'function' && drawer.current.close();
    }

    return nav[context] ? <Component ref={drawer}>
        <div className="nav">
            {nav[context].map(({ disable, path, label, title }) => {
                return <React.Fragment key={path}>
                    {title && <div className="nav-title">{intl.formatMessage({ id: `nav.title.${title}` })}</div>}
                    <Link disable={disable} onClick={go} path={path}>{label}</Link>
                </React.Fragment>
            })}
        </div>
    </Component>
        : <React.Fragment />
}

function Link({ children, path, disable = false, onClick }) {
    const history = useHistory();

    function go() {
        if (disable) return;
        onClick && onClick(path);
    }

    let pathname = history.location.pathname;
    pathname = pathname.substring(pathname.lastIndexOf("/") + 1);
    return <a onClick={go} className={classnames('nav-item', { 'disable': disable, 'active': pathname === path.split('/')[1] })}>{children}</a>
}

const Drawer = forwardRef(
    function ({ children }, ref) {
        const [open, setOpen] = useState(false);

        useImperativeHandle(ref, () => ({
            close() {
                setOpen(false);
            }
        }))

        return createPortal(<div className="drawer-wrapper">
            <div className={classnames("drawer", "drawer-left", { "drawer-open": open })}>
                <div className="drawer-mask"></div>
                <div className="drawer-content-wrapper">
                    <div className="drawer-content">{children}</div>
                    <div className="drawer-handle" onClick={() => setOpen(!open)}>
                        <i className="drawer-handle-icon" />
                    </div>
                </div>
            </div>
        </div>, document.body);
    })

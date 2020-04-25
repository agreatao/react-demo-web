import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import './drawer.less';
import './nav.less';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

export default connect(
    ({ browser, locale }) => ({ width: browser.width, lang: locale.lang })
)(
    function Nav({ width, lang }) {
        const intl = useIntl();
        const history = useHistory();
        let Component = ({ children }) => <div className="nav-wrapper">{children}</div>;
        if (width < 1024) {
            Component = Drawer;
        }

        function go(path) {
            history.push(`/${lang}/${path}`);
        }

        return <Component>
            <div className="nav">
                <div className="nav-title">{intl.formatMessage({ id: 'TITLE_CHARGE' })}</div>
                <Link disable onClick={go} path="iol">ZZ IOL</Link>
                <Link disable onClick={go} path="tiol">ZZ Toric IOL</Link>
                <div className="nav-title">{intl.formatMessage({ id: 'TITLE_RS' })}</div>
                <Link onClick={go} path="vr">VR</Link>
                <Link disable onClick={go} path="vrp">VR pro</Link>
                <Link onClick={go} path="lsa">ZZ LSA</Link>
                <div className="nav-title">{intl.formatMessage({ id: 'TITLE_ICL' })}</div>
                <Link onClick={go} path="icl">ZZ ICL</Link>
                <Link onClick={go} path="iclv">ZZ ICL Vault</Link>
                <Link onClick={go} path="ticl">ZZ TICL Rotation</Link>
                <div className="nav-title">{intl.formatMessage({ id: 'TITLE_TOOLS' })}</div>
                <Link onClick={go} path="sia">ZZ SIA</Link>
                <Link onClick={go} path="vsas">ZZ Vector Sum &amp; Sub</Link>
                <Link onClick={go} path="mean">ZZ Mean&plusmn;SD Vector</Link>
                <Link onClick={go} path="exop">ZZ EX500 OPMI</Link>
                <div className="nav-title">{intl.formatMessage({ id: 'TITLE_KM' })}</div>
                <Link onClick={go} path="ok">ZZ Ortho K</Link>
            </div>
        </Component>
    }
)

function Link({ children, path, disable = false, onClick }) {
    const history = useHistory();

    function go() {
        if (disable) return;
        onClick && onClick(path);
    }

    let pathname = history.location.pathname;
    pathname = pathname.substring(pathname.lastIndexOf("/") + 1);
    return <a onClick={go} className={classnames('nav-item', { 'disable': disable, 'active': pathname === path })}>{children}</a>
}


function Drawer({ children }) {
    const [open, setOpen] = useState(false);
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
}
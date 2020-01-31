import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import classnames from 'classnames';
import './index.less';

export default connect(
    ({ routes }) => ({ routes })
)(function Nav({ routes, onChange }) {
    const history = useHistory();
    const { locale, method } = useParams();

    function pageChange(e, path) {
        e.preventDefault();
        history.push(`/${locale}${path}`);
        onChange && onChange();
    }

    return <div className='nav'>
        {routes && routes.map(item => <a className={classnames({
            active: item.path === `/${method}`
        })} onClick={e => pageChange(e, item.path)} key={item.path}>{item.name}</a>)}
    </div>
})
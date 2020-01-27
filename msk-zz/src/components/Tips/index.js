import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import './index.less';

export default connect(
    ({ tips }) => ({ tips })
)(function Tips({ tips }) {
    const intl = useIntl();
    return tips && Object.keys(tips).map(item =>
        <Alert
            key={item}
            message={intl.formatMessage({ id: item })}
            description={tips[item]}
            type={item === 'INSTRUCTIONS' ? 'success' : 'error'}
        />
    )
})
import { Alert, Row, Col } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import './index.less';

export default connect(
    ({ tips }) => ({ tips })
)(function Tips({ tips }) {
    const intl = useIntl();
    return <div className='tips'>
        <Row gutter={[0, 12]}>
            {tips && Object.keys(tips).map(item => {
                if (intl.formatMessage({ id: tips[item] }) === tips[item]) return null;
                return <Col key={item} span={24}>
                    <Alert
                        message={intl.formatMessage({ id: item })}
                        description={intl.formatMessage({ id: tips[item] })}
                        type={item === 'INSTRUCTIONS' ? 'success' : 'error'}
                    />
                </Col>
            })}
        </Row>
    </div>

})
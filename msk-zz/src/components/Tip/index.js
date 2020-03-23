import React from 'react';
import './index.less';
import { useIntl } from 'react-intl';

export default function Tip({ method, tips = ['INSTRUCTIONS', 'NOTES'] }) {
    const intl = useIntl();
    return <div className="tip">
        {/* <h1 className="title">{method}</h1> */}
        {tips && tips.map(tip => <React.Fragment key={tip}>
            <h3 className="sub-title">{intl.formatMessage({ id: tip })}</h3>
            <p dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: `${method}_${tip}` }).replace(/\n/g, '<br/>') }}></p>
        </React.Fragment>)}
    </div>
}
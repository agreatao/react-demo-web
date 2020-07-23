import React from 'react';
import './index.less';
import { useIntl } from 'react-intl';

export default function Tip({ method, tips = ['instructions', 'notes', 'rawdata', 'pay'] }) {
    const intl = useIntl();

    function formatMessage(opts = {}) {
        const { id, ...restOpts } = opts;
        try {
            const value = intl.formatMessage({ id, ...restOpts });
            return value === id ? null : value;
        } catch {
            return null;
        }
    }

    let name = formatMessage({ id: `calc.${method}.name` });
    return <div className="tip">
        {name && <h1 className="title">{name}</h1>}
        {tips && tips.map(tip => {
            const content = formatMessage({ id: `calc.${method}.${tip}` });
            return content && <React.Fragment key={tip}>
                <h3 className="sub-title">{formatMessage({ id: `tip.title.${tip}` })}</h3>
                <p dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}></p>
            </React.Fragment>
        })}
    </div>
}
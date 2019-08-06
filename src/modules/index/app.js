import React from 'react';
import entry from 'utils/entry';

class Test extends React.Component {
    render() {
        return <div className="test"></div>
    }
}

entry(<Test />);
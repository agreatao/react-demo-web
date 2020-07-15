import React from 'react';

export default function asyncComponent(loadComponent) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                Component: null
            }
        }
        componentDidMount() {
            const { Component } = this.state;
            if (Component) return;
            loadComponent()
                .then(module => this.setState({ Component: module.default }))
                .catch(e => console.error('Cannot load Component', e))
        }
        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props} /> : null
        }
    }
}
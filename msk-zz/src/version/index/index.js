import { vr, ticl, lsa, iol, toriciol, astigmatism, ok, exopmi } from 'api';
import { createBrowserHistory } from 'history';
import LocaleProvider from 'locale/Provider';
import Main from 'main';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import createStore from 'store';
import "theme/index.less";

const history = createBrowserHistory();

const store = createStore(
    {
        routes: [
            {
                path: '/vr',
                name: 'VR'
            },
            {
                path: '/ticl',
                name: 'TICL'
            },
            {
                path: '/lsa',
                name: 'LSA'
            },
            {
                path: '/iol',
                name: 'Iol'
            },
            {
                path: '/toriciol',
                name: 'Toric Iol'
            },
            {
                path: '/astigmatism',
                name: 'Add.&Sub. of Astigmatism'
            },
            {
                path: '/ok',
                name: 'OK'
            },
            {
                path: '/exopmi',
                name: 'EX500 OPMI'
            }
        ],
        caculate: {
            vr: {
                formItems: [
                    {
                        name: 'opicZone',
                        label: 'Optical Zone',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Optical Zone' } }]
                    },
                    {
                        name: 'maniSph',
                        label: 'Mani Sph',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Sph' } }]
                    },
                    {
                        name: 'maniCyl',
                        label: 'Mani Cyl',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Cyl' } }]
                    },
                    {
                        name: 'maniCylAxis',
                        label: 'Mani Cyl Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Cyl Axis' } }]
                    },
                    {
                        name: 'c7',
                        label: 'C7',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'C7' } }]
                    },
                    {
                        name: 'c8',
                        label: 'C8',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'C8' } }]
                    },
                    {
                        name: 'c11',
                        label: 'C11',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'C11' } }]
                    },
                    {
                        name: 'c12',
                        label: 'C12',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'C12' } }]
                    },
                    {
                        name: 'c13',
                        label: 'C13',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'C13' } }]
                    }
                ],
                method: vr
            },
            ticl: {
                formItems: [
                    {
                        name: 'maniSph',
                        label: 'Mani Sph',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Sph' } }]
                    },
                    {
                        name: 'maniCyl',
                        label: 'Mani Cyl',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Cyl' } }]
                    },
                    {
                        name: 'maniCylAxis',
                        label: 'Mani Cyl Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Mani Cyl Axis' } }]
                    },
                    {
                        name: 'resiSph',
                        label: 'Resi Sph',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Resi Sph' } }]
                    },
                    {
                        name: 'resiCyl',
                        label: 'Resi Cyl',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Resi Cyl' } }]
                    },
                    {
                        name: 'resiCylAxis',
                        label: 'Resi Cyl Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Resi Cyl Axis' } }]
                    },
                    {
                        name: 'siaD',
                        label: 'Sia D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Sia D' } }]
                    },
                    {
                        name: 'siaAxis',
                        label: 'Sia Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Sia Axis' } }]
                    },
                ],
                method: ticl
            },
            lsa: {
                formItems: [
                    {
                        name: 'opicZone',
                        label: 'Opic Zone',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Opic Zone' } }]
                    },
                    {
                        name: 'k1',
                        label: 'K1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'K1' } }]
                    },
                    {
                        name: 'correctD',
                        label: 'correct D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'correct D' } }]
                    },
                    {
                        name: 'e1',
                        label: 'E1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'E1' } }]
                    },
                    {
                        name: 'postQ1',
                        label: 'Post Q1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Post Q1' } }]
                    },
                    {
                        name: 'k2',
                        label: 'K2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'K2' } }]
                    },
                    {
                        name: 'd2',
                        label: 'D2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'D2' } }]
                    },
                    {
                        name: 'e2',
                        label: 'E2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'E2' } }]
                    },
                    {
                        name: 'postQ2',
                        label: 'Post Q2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Post Q2' } }]
                    },
                ],
                method: lsa
            },
            iol: {
                formItems: [
                    {
                        name: 'aConstant',
                        label: 'A constant',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'A constant' } }]
                    },
                    {
                        name: 'targetD',
                        label: 'target D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'target D' } }]
                    },
                    {
                        name: 'ct',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'ct' } }]
                    },
                    {
                        name: 'ac',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'ac' } }]
                    },
                    {
                        name: 'kf',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kf' } }]
                    },
                    {
                        name: 'kb',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kb' } }]
                    },
                    {
                        name: 'al',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'al' } }]
                    },
                    {
                        name: 'lt',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'lt' } }]
                    }
                ],
                method: iol
            },
            toriciol: {
                formItems: [
                    {
                        name: 'aCons',
                        label: 'A constant',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'A constant' } }]
                    },
                    {
                        name: 'targetD',
                        label: 'target D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'target D' } }]
                    },
                    {
                        name: 'ct',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'ct' } }]
                    },
                    {
                        name: 'ac',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'ac' } }]
                    },
                    {
                        name: 'kf1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kf1' } }]
                    },
                    {
                        name: 'kf2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kf2' } }]
                    },
                    {
                        name: 'kb1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kb1' } }]
                    },
                    {
                        name: 'kb2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'kb2' } }]
                    },
                    {
                        name: 'axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'axis' } }]
                    },
                    {
                        name: 'al',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'al' } }]
                    },
                    {
                        name: 'lt',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'lt' } }]
                    },
                    {
                        name: 'sia',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'sia' } }]
                    },
                    {
                        name: 'siaAxis',
                        label: 'Sia Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Sia Axis' } }]
                    }
                ],
                method: toriciol
            },
            astigmatism: {
                formItems: [
                    {
                        name: 'sph1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'sph1' } }]
                    },
                    {
                        name: 'cyl1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'cyl1' } }]
                    },
                    {
                        name: 'axis1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'axis1' } }]
                    },
                    {
                        name: 'sph2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'sph2' } }]
                    },
                    {
                        name: 'cyl2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'cyl2' } }]
                    },
                    {
                        name: 'axis2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'axis2' } }]
                    }
                ],
                method: astigmatism
            },
            ok: {
                formItems: [
                    {
                        name: 'vertex',
                        label: 'vertex',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'vertex' } }]
                    },
                ],
                method: ok
            },
            exopmi: {
                formItems: [
                    {
                        name: 'r',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'r' } }]
                    },
                    {
                        name: 'n',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'n' } }]
                    },
                ],
                method: exopmi
            },
        }
    }
);

render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route
                    path="/:locale/:method"
                    render={(props) => {
                        return <LocaleProvider {...props}>
                            <Main {...props} />
                        </LocaleProvider>
                    }}>
                </Route>
            </Switch>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
)
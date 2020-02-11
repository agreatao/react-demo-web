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
                        label: 'SIA D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'SIA D' } }]
                    },
                    {
                        name: 'siaAxis',
                        label: 'SIA Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'SIA Axis' } }]
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
                        label: 'K (A)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'K (A)' } }]
                    },
                    {
                        name: 'correctD',
                        label: 'Correct D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Correct D' } }]
                    },
                    {
                        name: 'e1',
                        label: 'e (A)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'e (A)' } }]
                    },
                    {
                        name: 'postQ1',
                        label: 'Post Q (A)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Post Q (A)' } }]
                    },
                    {
                        name: 'k2',
                        label: 'K (P)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'K (P)' } }]
                    },
                    {
                        name: 'd2',
                        label: 'D (P)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'D (P)' } }]
                    },
                    {
                        name: 'e2',
                        label: 'e (P)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'e (P)' } }]
                    },
                    {
                        name: 'postQ2',
                        label: 'Post Q (P)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Post Q (P)' } }]
                    },
                    {
                        name: 's',
                        label: 's',
                        default: 10000000
                    }
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
                        label: 'Target D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Target D' } }]
                    },
                    {
                        name: 'ct',
                        label: 'CT (μm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'CT' } }]
                    },
                    {
                        name: 'ac',
                        label: 'AC (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'AC' } }]
                    },
                    {
                        name: 'kf',
                        label: 'Kf',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kf' } }]
                    },
                    {
                        name: 'kb',
                        label: 'Kb',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kb' } }]
                    },
                    {
                        name: 'al',
                        label: 'AL (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'AL' } }]
                    },
                    {
                        name: 'lt',
                        label: 'LT (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'LT' } }]
                    }
                ],
                method: iol
            },
            toriciol: {
                formItems: [
                    {
                        name: 'aCons',
                        label: 'A cons',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'A cons' } }]
                    },
                    {
                        name: 'targetD',
                        label: 'Target D',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Target D' } }]
                    },
                    {
                        name: 'ct',
                        label: 'CT (μm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'CT' } }]
                    },
                    {
                        name: 'ac',
                        label: 'AC (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'AC' } }]
                    },
                    {
                        name: 'kf1',
                        label: 'Kf',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kf' } }]
                    },
                    {
                        name: 'kf2',
                        label: 'Kf',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kf' } }]
                    },
                    {
                        name: 'kb1',
                        label: 'Kb',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kb' } }]
                    },
                    {
                        name: 'kb2',
                        label: 'Kb',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Kb' } }]
                    },
                    {
                        name: 'axis',
                        label: 'Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Axis' } }]
                    },
                    {
                        name: 'al',
                        label: 'AL (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'AL' } }]
                    },
                    {
                        name: 'lt',
                        label: 'LT (mm)',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'LT' } }]
                    },
                    {
                        name: 'sia',
                        label: 'SIA',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'SIA' } }]
                    },
                    {
                        name: 'siaAxis',
                        label: 'SIA Axis',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'SIA Axis' } }]
                    }
                ],
                method: toriciol
            },
            astigmatism: {
                formItems: [
                    {
                        name: 'sph1',
                        label: 'Sph 1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Sph 1' } }]
                    },
                    {
                        name: 'cyl1',
                        label: 'Cyl 1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Cyl 1' } }]
                    },
                    {
                        name: 'axis1',
                        label: 'Axis 1',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Axis 1' } }]
                    },
                    {
                        name: 'sph2',
                        label: 'Sph 2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Sph 2' } }]
                    },
                    {
                        name: 'cyl2',
                        label: 'Cyl 2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Cyl 2' } }]
                    },
                    {
                        name: 'axis2',
                        label: 'Axis 2',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Axis 2' } }]
                    }
                ],
                method: astigmatism,
                format: false
            },
            ok: {
                formItems: [
                    {
                        name: 'vertex',
                        label: 'Vertex',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'Vertex' } }]
                    },
                ],
                method: ok
            },
            exopmi: {
                formItems: [
                    {
                        name: 'r',
                        label: 'R',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'R' } }]
                    },
                    {
                        name: 'n',
                        label: 'N',
                        rules: [{ required: true, message: { id: "RULE_REQUIRED", label: 'N' } }]
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
import ZZ_EX500_OPMI from '@/pages/exop';
import ZZ_ICL from '@/pages/icl';
import ZZ_ICL_VAULT from '@/pages/iclv';
import ZZ_IOL from '@/pages/iol';
import ZZ_LSA from '@/pages/lsa';
import ZZ_OK from '@/pages/ok';
import ZZ_SIA from '@/pages/sia';
import ZZ_TICL_TORATION from '@/pages/ticl';
import ZZ_TORIC_IOL from '@/pages/tiol';
import VR from '@/pages/vr';
import VR_PRO from '@/pages/vrpro';
import ZZ_VECTOR_SUM_SUB from '@/pages/vsas';
import Master from 'components/Master';
import { createBrowserHistory } from 'history';
import LocaleProvider from 'locale/Provider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import createStore from 'store';
import "theme/index.less";
import browserBind from "./browserBind";
import "./index.less";

const history = createBrowserHistory();

const store = createStore();

browserBind(store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route
                    path="/:locale"
                    render={props => <LocaleProvider {...props}>
                        <Master>
                            {/* ZZ IOL */}
                            <Route path="/:locale/iol" component={ZZ_IOL} />
                            {/* ZZ TORIC IOL */}
                            <Route path="/:locale/tiol" component={ZZ_TORIC_IOL} />

                            {/* VR */}
                            <Route path="/:locale/vr" component={VR} />
                            {/* VR pro */}
                            <Route path="/:locale/vrp" component={VR_PRO} />
                            {/* ZZ LSA */}
                            <Route path="/:locale/lsa" component={ZZ_LSA} />

                            {/* ZZ ICL */}
                            <Route path="/:locale/icl" component={ZZ_ICL} />
                            {/* ZZ ICL Vault */}
                            <Route path="/:locale/iclv" component={ZZ_ICL_VAULT} />
                            {/* ZZ TICL TORATION */}
                            <Route path="/:locale/ticl" component={ZZ_TICL_TORATION} />

                            {/* ZZ SIA */}
                            <Route path="/:locale/sia" component={ZZ_SIA} />
                            {/* ZZ Vector Sum & Sub */}
                            <Route path="/:locale/vsas" component={ZZ_VECTOR_SUM_SUB} />
                            {/* ZZ Mean±SD Vector */}
                            {/* <Route path="/:locale/mean" component={ZZ_MEAN_SD_VECTOR} /> */}
                            {/* ZZ OK  */}
                            <Route path="/:locale/ok" component={ZZ_OK} />
                            {/* ZZ EX500 OPMI */}
                            <Route path="/:locale/exop" component={ZZ_EX500_OPMI} />
                        </Master>
                    </LocaleProvider>}
                />
            </Switch>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
)
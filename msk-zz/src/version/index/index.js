import { createHashHistory } from 'history';
import LocaleProvider from 'locale/Provider';
import Main from 'main';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { combineReducers, createStore } from 'redux';
import "theme/index.less";

const store = createStore(
    combineReducers({
        locale(state = { lang: 'en', label: 'English' }, { type }) {
            switch (type) {
                case 'TOGGLE': {
                    return {
                        lang: state.lang === 'en' ? 'zh' : 'en',
                        label: state.lang === 'en' ? 'English' : '中文'
                    }
                }
                case 'EN': {
                    return {
                        lang: 'en',
                        label: '中文'
                    }
                }
                case 'ZH': {
                    return {
                        lang: 'zh',
                        label: 'English'
                    }
                }
                default: return state;
            }
        },
        routes(state = []) {
            return state;
        },
        tips(state = {}) {
            return state;
        }
    }),
    {
        locale: {
            lang: 'en',
            label: 'English'
        },
        routes: [
            {
                path: '/vr',
                name: 'VR'
            }
        ],
        tips={
            // 'INSTRUCTIONS': intl.formatMessage({ id: "VR_INSTRUCTIONS" }),
            // 'NOTES': intl.formatMessage({ id: "VR_NOTES" })
        }
    }
)

render(
    <Provider store={store}>
        <LocaleProvider>
            <Router history={createHashHistory()}>
                <Switch>
                    <Route
                        path="/:method"
                        component={Main}
                    />
                </Switch>
            </Router>
        </LocaleProvider>
    </Provider>
    ,
    document.getElementById('app')
)
import dva from "dva";
import createLoading from 'dva-loading';
import browserModel from "models/browser";
import { createLogger } from "redux-logger";
import "theme/index.less";
import "./index.less";
import router from "./router";

const app = dva({
    // onAction: createLogger(),
    onError: (e) => {
        console.error(e);
    }
});

app.use(createLoading());

app.model(browserModel);

app.router(router);

app.start(document.getElementById("app"));

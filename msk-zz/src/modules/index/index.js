import { message } from "antd";
import dva from "dva";
import createLoading from 'dva-loading';
import browserModel from "models/browser";
import i18n from "models/i18n";
import "theme/index.less";
import "./index.less";
import router from "./router";

const app = dva({
    onError: (e) => {
        message.error(e.message);
    }
});

app.use(createLoading());

app.model(browserModel);
app.model(i18n);

app.router(router);

app.start(document.getElementById("app"));

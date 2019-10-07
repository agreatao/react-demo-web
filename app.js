const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
// const multipart = require("connect-multiparty");
// const multipartMiddleware = multipart();
const request = require("request");

const CONFIG = require("./config/development.config");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "dist/templates"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 静态资源
app.use(`${CONFIG.baseURL}/`, express.static(path.join(__dirname, "dist/static")));
// app.use(`${CONFIG.baseURL}/login`, express.static(path.join(__dirname, "dist/templates", "login.html")));
// app.use(`${CONFIG.baseURL}/appointRegister`, express.static(path.join(__dirname, "dist/templates", "appointRegister.html")));
// app.use(`${CONFIG.baseURL}/appointOperationCheck`, express.static(path.join(__dirname, "dist/templates", "appointOperationCheck.html")));
// app.use(`${CONFIG.baseURL}/appointOperation`, express.static(path.join(__dirname, "dist/templates", "appointOperation.html")));
app.use(`${CONFIG.baseURL}/sickInfo`, express.static(path.join(__dirname, "dist/templates", "sickInfo.html")));
app.use(`${CONFIG.baseURL}/sickNormalCheck`, express.static(path.join(__dirname, "dist/templates", "sickNormalCheck.html")));
app.use(`${CONFIG.baseURL}/checkType`, express.static(path.join(__dirname, "dist/templates", "checkType.html")));
app.use(`${CONFIG.baseURL}/chargeNotice`, express.static(path.join(__dirname, "dist/templates", "chargeNotice.html")));
// app.use(`${CONFIG.baseURL}/medicine`, express.static(path.join(__dirname, "dist/templates", "medicine.html")));
// app.use(`${CONFIG.baseURL}/doctor`, express.static(path.join(__dirname, "dist/templates", "doctor.html")));
// app.use(`${CONFIG.baseURL}/queue`, express.static(path.join(__dirname, "dist/templates", "queue.html")));
// app.use(`${CONFIG.baseURL}/paymentNotices`, express.static(path.join(__dirname, "dist/templates", "paymentNotices.html")));
// app.use(`${CONFIG.baseURL}/paymentProducts`, express.static(path.join(__dirname, "dist/templates", "paymentProducts.html")));

app.all(`${CONFIG.baseURL}/**`, (req, res, next) => {
    request(
        {
            method: req.method,
            url: CONFIG.apiUrl + req.url,
            json: true,
            body: req.body,
            rejectUnauthorized: false
        },
        (error, response, body) => {
            if (error) {
                next();
            } else {
                let contentType = response.headers["content-type"];
                res.set("content-type", contentType);
                res.send(body);
            }
        }
    );
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

const http = require("http").createServer(app);
http.listen(80, () => {
    console.log("server start at http://localhost");
});

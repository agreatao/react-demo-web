const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const request = require("request");

const CONFIG = require("./config/development.config");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "dist/templates"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// 静态资源
app.use(`${CONFIG.baseURL}/`, express.static(path.join(__dirname, "dist/static")));

app.use(`${CONFIG.baseURL}/patient`, express.static(path.join(__dirname, "dist/templates", "patient.html")));
app.use(`${CONFIG.baseURL}/operationCheckAppointment`, express.static(path.join(__dirname, "dist/templates", "operationCheckAppointment.html")));
app.use(`${CONFIG.baseURL}/medicine`, express.static(path.join(__dirname, "dist/templates", "medicine.html")));
app.use(`${CONFIG.baseURL}/doctor`, express.static(path.join(__dirname, "dist/templates", "doctor.html")));



// 后台数据请求代理
app.all(`${CONFIG.baseURL}/**`, (req, res, next) => {
    console.log(CONFIG.apiUrl + req.url);
    console.log(req.body);
    request({
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

// const cert = fs.readFileSync('bin/server.crt', 'utf8');
// const key = fs.readFileSync('bin/server.key', 'utf8');
// const https = require("https").createServer({ cert, key }, app);
// https.listen(443);
const Controller = require("egg").Controller;

class LoginController extends Controller {
    async login() {
        await this.ctx.render("/login.tpl");
    }

    async loginSubmit() {
        const { body, query } = this.ctx.request;
        const { username, password } = body;
        const { url } = query;
        this.ctx.session.user = username;
        this.ctx.status = 301;
        await this.ctx.redirect(url);
    }

    async logout() {
        this.ctx.session.user = null;
        this.ctx.status = 301;
        await this.ctx.redirect("/login");
    }

    async ajaxLogout() {
        this.ctx.session.user = null;
        this.ctx.body = {
            url: "login",
            code: 0,
        };
    }
}

module.exports = LoginController;

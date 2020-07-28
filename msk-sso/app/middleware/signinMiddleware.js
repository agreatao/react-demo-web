class UrlMatch {
    constructor(pattern) {
        this.reg = pattern;
        if (typeof this.reg === "string") {
            this.reg = this.reg.replace(/[\[\]\\\^\:\/\?\+]/g, (m) => `\\${m}`);
            this.reg = this.reg.replace(/\\\/\*\*|\\\/\*/g, (m) => {
                if (m === "\\/**") return `(\\\/[a-zA-Z0-9_]*)*`;
                else return `(\\\/[\\w.]+)?`;
            });
            this.reg = new RegExp(this.reg, "gi");
            console.log(this.reg);
        }
    }
    test(url) {
        if (this.reg && this.reg.test) {
            return this.reg.test(url);
        }
        return false;
    }
}

module.exports = (options, app) => {
    return async function signinMiddleware(ctx, next) {
        const { ignoreUrls } = options;
        // if()
        console.log(ctx.path);
        for (let url of ignoreUrls) {
            const urlMatch = new UrlMatch(url);
            const result = urlMatch.test(ctx.path);
            console.log(result);
        }

        // const { user } = ctx.session;
        // if (!user) {
        //     ctx.status = 301;
        //     ctx.redirect(`/login?url=${ctx.url}`);
        //     return;
        // }
        await next();
    };
};

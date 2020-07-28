/* eslint valid-jsdoc: "off" */

module.exports = (appInfo) => {
    const config = (exports = {});

    config.keys = appInfo.name + "_1595489457945_9109";

    config.view = {
        defaultViewEngine: "nunjucks",
        mapping: {
            ".tpl": "nunjucks",
        },
    };

    config.middleware = ["signinMiddleware"];

    config.signinMiddleware = {
        ignoreUrls: ["/news/**"],
    };

    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};

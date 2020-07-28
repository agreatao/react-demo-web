/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller, middleware } = app;
    router.get("/login", controller.login.login);
    router.post("/login", controller.login.loginSubmit);
    router.get("/logout", controller.login.logout);
    router.post("/logout", controller.login.ajaxLogout);
    router.get("/news", controller.news.list);
    router.get("/news/2", controller.news.list2);
};

module.exports = {
    baseURL: "/msk",
    pages: ["patient", "operationCheckAppointment", "medicine", "doctor", "login"],
    title: "",
    nav: [
        { to: "/patient", title: "患者信息管理" },
        { to: "/operationcheckAppointment", title: "术前预约管理" },
        { to: "medicine", title: "药品管理" },
        { to: "/doctor", title: "医生管理" },
    ],
    apiUrl: "http://localhost:8060" // 接口
};

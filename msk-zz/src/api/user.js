import Http from "utils/http";

export const login = Http.post("/userInfo/login");

export const register = Http.post("/userInfo/add");

export const isLogin = Http.post("/userInfo/isLogin");

export const userList = Http.post("/userInfo/list");

export const logout = Http.post("/userInfo/logout");

export const sendMessage = Http.post("/alibaba/sendMail");

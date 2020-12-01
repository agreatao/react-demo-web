import http from "utils/http";

export const isLogin = http("/userInfo/isLogin").post;

export const logout = http("/userInfo/logout").post;

export const login = http("/userInfo/login").post;

export const register = http("/userInfo/login").post;

// export const login = Http.post("/userInfo/login");

// export const register = Http.post("/userInfo/add");

// export const isLogin = http("/userInfo/isLogin");

// export const userList = Http.post("/userInfo/list");

// export const logout = Http.post("/userInfo/logout");

// export const sendMessage = Http.post("/alibaba/sendMail");

import http from "utils/http";

export const login = ({ userName, password }) => http.post("/login/loginCheck", { userName, password })
    .then(data => data.result)

export const logout = () => http.get("/login/loginOut")
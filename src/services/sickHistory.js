import http from "utils/http";

export const querySickHistory = sickInfoId => http.get("/sick/querySickHistory", { params: { sickInfoId } })
    .then(data => data.result);
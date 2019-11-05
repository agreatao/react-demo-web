import http from "utils/http";

export const querySickHistory = sickInfoId => http.get("/sick/querySickHistory", { params: { sickInfoId } })
    .then(data => data.result);

export const saveSickHistory = sickHistory => http.post("/sick/addSickHistory", sickHistory);

export const updateSickHistory = sickHistory => http.post("/sick/updateSickHistory", sickHistory);
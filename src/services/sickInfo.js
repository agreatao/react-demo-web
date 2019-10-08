import http from "utils/http";

export const fetchSickInfo = (page, filter) => http.post("/sick/getSickInfoList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));


export const getRandomSickId = () => http.get("/sick/getRandomSickId")
    .then(data => data.result);

export const saveSickInfo = sickInfo => http.post("/sick/addSickInfo", sickInfo);

export const updateSickInfo = sickInfo => http.post("/sick/updateSickInfo", sickInfo);

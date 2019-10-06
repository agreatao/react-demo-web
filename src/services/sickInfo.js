import http from "utils/http";

export const fetchSickInfo = (page, filter) => http.post("/sick/getSickInfoList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));
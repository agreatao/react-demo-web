import http from "utils/http";

export const fetchNormalCheck = (page, filter) => http.post("/sick/getSickNormalCheckList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }))
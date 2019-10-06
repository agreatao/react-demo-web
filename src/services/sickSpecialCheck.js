import http from "utils/http";

export const fetchSpecialCheck = (page, filter) => http.post("/sick/getSickSpecialCheckList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }))
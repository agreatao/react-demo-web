import http from "utils/http";

export const fetchCheckType = (page, filter) => http.post("/payments/getCheckTypeList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));

export const fetchChargeNotice = (page, filter) => http.post("/payments/getChargeNoticeList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));

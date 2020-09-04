import Http from "utils/http";

// 调起支付
export const pay = Http.post("/alibaba/pay");

// 查询支付状态
export const payStatus = Http.post("/alibaba/query");

export const uploadIOL = Http.upload("/alibaba/fileUpload");

export const download = (id) => `/alibaba/fileDownload?id=${id}`;

export const fetchIolList = Http.post("/alibaba/fileList");

export const setResult = Http.post("/alibaba/updateResultContent");

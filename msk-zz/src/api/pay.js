// import Http from "utils/http";

// // 调起支付
// export const pay = Http.post("/alibaba/pay");

// // 查询支付状态
// export const payStatus = Http.post("/alibaba/query");

// export const uploadIOL = Http.upload("/alibaba/fileUpload");

// export const download = (id) => `/alibaba/fileDownload?id=${id}`;

// export const fetchIolList = Http.post("/alibaba/fileList");

// export const setResult = Http.post("/alibaba/updateResultContent");

import http from "utils/http";

export const pay = http("/pay/pay").post;

export const payStatus = http("/pay/query").post;

export const uploadZcsFile = http("/pay/fileUpload", {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}).post;

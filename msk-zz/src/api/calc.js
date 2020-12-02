// export const calcTICL = Http.post("/calculate/zzticl");



// export const calcVSAS = Http.post("/calculate/zzastigmatism");

// export const calcOK = Http.post("/calculate/zzok");

// export const calcEXOP = Http.post("/calculate/zzexopmi");


// export const calcICLV = Http.post("/calculate/zziclvault");

// export const calcSIA = Http.post("/calculate/zzsia");

// export const calcMEAN = Http.post("/calculate/zzmeansdvector");

// export const uploadMEAN = Http.upload("/calculate/zzmeanexcel");


// export const calcPcprl = Http.post("/calculate/zzpcprl");

import http from "utils/http";

export default function (method) {
    return http(`/calculate/${method}`).post;
}

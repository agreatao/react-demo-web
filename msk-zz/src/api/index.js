import http from "utils/http";

export const vr = (params) =>
    http.post('/formulavr', params).then(({ result }) => result);

export const ticl = (params) =>
    http.post('/zzticl', params).then(({ result }) => result);

export const lsa = (params) =>
    http.post('/zzlsa', params).then(({ result }) => result);

export const iol = (params) =>
    http.post('/zziol', params).then(({ result }) => result);

export const toriciol = (params) =>
    http.post('/zztoriciol', params).then(({ result }) => result);

export const astigmatism = (params) =>
    http.post('/zzastigmatism', params).then(({ result }) => result);

export const ok = (params) =>
    http.post('/zzok', params).then(({ result }) => result);

export const exopmi = (params) =>
    http.post('/zzexopmi', params).then(({ result }) => result);

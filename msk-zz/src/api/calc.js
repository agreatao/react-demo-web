import Http from "utils/http";

export const calcVR = Http.post('/calculate/formulavr');

export const calcTICL = Http.post('/calculate/zzticl');

export const calcLSA = Http.post('/calculate/zzlsa');

export const calcTIOL = Http.post('/calculate/zztoriciol');

export const calcVSAS = Http.post('/calculate/zzastigmatism');

export const calcOK = Http.post('/calculate/zzok');

export const calcEXOP = Http.post('/calculate/zzexopmi');

export const calcVRPRO = Http.post('/calculate/formulavrpro');

export const calcICL = Http.post('/calculate/zzicl');

export const calcICLV = Http.post('/calculate/zziclvault');

export const calcSIA = Http.post('/calculate/zzsia');

export const calcMEAN = Http.post('/calculate/zzmeansdvector');

export const uploadMEAN = Http.upload('/calculate/zzmeanexcel');
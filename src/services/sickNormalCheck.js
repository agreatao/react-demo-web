import http from "utils/http";

export const fetchNormalCheck = (page, filter) => http.post("/sick/getSickNormalCheckList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));

export const saveSickNormalCheck = (sickNormalCheck) => http.post("/sick/addSickNormalCheck", sickNormalCheck);

export const updateSickNormalCheck = (sickNormalCheck) => http.post("/sick/updateSickNormalCheck", sickNormalCheck);

export const removeSickNormalCheck = ids => http.get("/sick/deleteSickNormalCheck", { params: { ids: ids.join(",") } })

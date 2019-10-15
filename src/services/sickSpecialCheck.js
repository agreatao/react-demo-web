import http from "utils/http";

export const fetchSpecialCheck = (page, filter) => http.post("/sick/getSpecialInspectionList", filter, { params: page })
    .then(data => ({ list: data.result, total: data.total }));

export const getSpecialCheck = ({ specialId, reportType }) => http.post("/sick/getSickSpecialCheckListByType", { specialId, reportType })
    .then(data => console.log(data.result));

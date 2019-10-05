import http from "utils/http";

export const fetch = (page, filter) => {
    return http.post("/sick/getSickInfoList", filter, { params: page }).then(data => {
        return { list: data.result, total: data.total }
    });
}

export const remove = (ids) => {
    console.log(ids);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    })
}

export const fetchNormalCheck = (page, filter) => {
    return http.post("/sick/querySickNormalCheck", filter, { params: page }).then(data => {
        return { list: data.result, total: data.total }
    })
}

export const fetchSpecialCheck = (page, filter) => {
    return http.post("/sick/querySickSpecialCheck", filter, { params: page }).then(data => {
        return { list: data.result, total: data.total }
    })
}
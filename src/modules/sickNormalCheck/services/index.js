import http from "utils/http";

export const fetch = (page, filter) => {
    return http.post("/sick/getSickNormalCheckList", filter, { params: page }).then(data => {
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
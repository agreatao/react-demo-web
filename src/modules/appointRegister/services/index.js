export const fetch = (page, filter) => {
    console.log(page, filter);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                list: [
                    { name: 'dva', id: 1 },
                    { name: 'antd', id: 2 },
                ],
                total: 51
            })
        }, 3000);
    })
}

export const remove = (ids) => {
    console.log(ids);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    })
}
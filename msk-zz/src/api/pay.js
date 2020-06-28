import Http from 'utils/http';

// export const pay = ({ outTradeNo, type }) => http.post('/alibaba/pay', {
//     outTradeNo, type
// });

export const uploadIOL = Http.upload('/alibaba/fileUpload');

export const download = Http.get('/alibaba/fileDownload');

export const fetchIolList = Http.post('/alibaba/fileList');


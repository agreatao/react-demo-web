import http from "utils/http";

export const pay = http("/pay/pay").post;

export const payStatus = http("/pay/query").post;

export const uploadZcsFile = http("/pay/fileUpload", {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}).post;

export const searchFileList = http("/pay/fileList").post;

export const requestSendMessage = http("/pay/sendMail").post;

export const updateResult = http("/pay/updateResultContent").post;

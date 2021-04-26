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

export const getPayStatus = (outTradeNo, delay = 3000) => {
    return new Promise((resolve, reject) => {
        if (!outTradeNo) reject("订单号不为空");
        let timer;
        function loop() {
            if (timer) clearTimeout(timer);
            payStatus({ outTradeNo })
                .then(({ status }) => {
                    if (status === "WAIT_BUYER_PAY") timer = setTimeout(loop, delay);
                    else if (status === "TRADE_SUCCESS") resolve(status);
                    else reject(status);
                })
                .catch(reject);
        }
        loop();
    });
};

/**
 * 发起支付接口，返回一个支付状态， 支付失败，返回 false
 * @param {*} outTradeNo
 * @param {*} calcName
 * @returns
 */
export const sendPayment = async (outTradeNo, calcName) => {
    try {
        let form = await pay({ outTradeNo, type: calcName });
        const dom = document.createElement("div");
        document.body.append(dom);
        dom.innerHTML = form;
        form = document.getElementsByName("punchout_form");
        form[0].setAttribute("target", "_blank");
        form[0].submit();
        const status = await getPayStatus(outTradeNo, 3000);
        return status;
    } catch (e) {
        return false;
    }
};

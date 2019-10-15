import { getSpecialCheck } from "services/sickSpecialCheck";

function createCheckInfoDialog(data, resolve) {
    console.log(data);
    getSpecialCheck({ specialId: data.id, reportType: data.reportType });

    // return createXDialog({
    //     title: "常规检查",
    //     width: 700,
    //     children: ({ close }) => <CheckInfoForm data={data} onCancel={close} onSubmit={checkData => {
    //         typeof data === "function" ? data(checkData, { close }) : resolve && resolve(checkData, { close });
    //     }} />
    // })
}

export default createCheckInfoDialog;
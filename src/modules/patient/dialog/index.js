import { dialog } from "components/alert";
import React from "react";
import SickHistory from "./sickHistory";
import SickInfo from "./sickInfo";

export const viewSickHistory = id => {
    const { close } = dialog(<SickHistory sickInfoId={id} onCancel={handleCancel} />, { width: 989 });

    function handleCancel() {
        close();
    }
}

export const addOrEdit = data =>
    new Promise(resolve => {
        const { close } = dialog(<SickInfo data={data} onSuccess={handleSuccess} onCancel={handleCancel} />, { width: 720 });

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });
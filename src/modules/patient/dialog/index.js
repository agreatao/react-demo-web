import { dialog } from "components/alert";
import React from "react";
import SickHistory from "./sickHistory";
import AddOrEditForm from "./addOrEditForm";

export const viewSickHistory = id => {
    dialog(<SickHistory sickInfoId={id} />, { width: 989 });
}

export const addOrEdit = data =>
    new Promise(resolve => {
        const { close } = dialog(<AddOrEditForm data={data} onSuccess={handleSuccess} onCancel={handleCancel} />, {
            width: 800
        });

        function handleSuccess() {
            close();
            resolve();
        }

        function handleCancel() {
            close();
        }
    });
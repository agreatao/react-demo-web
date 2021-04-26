import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function VersionLogButton({ children, defaultShow = false }) {
    const [show, setShow] = useState(defaultShow);
    const intl = useIntl();

    useEffect(() => {
        if (show) {
            notification.destroy();
            notification.info({
                duration: null,
                message: `${intl.formatMessage({ id: "text.changeLog" })}:`,
                top: 96,
                style: {
                    width: 300,
                },
                description: children,
            });

            setTimeout(() => {
                setShow(false);
            }, 1000);
        }
    }, [show]);

    return (
        <Button onClick={() => setShow(true)} type="link">
            <FormattedMessage id="btn.versionLog" />
        </Button>
    );
}

import { Descriptions } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Item } = Descriptions;

export default function CalcResult({ data, dataKeys, title }) {
    const width = useSelector((state) => state.browser.width);

    return (
        <Descriptions
            style={{ marginBottom: 12 }}
            title={title}
            bordered
            colon={false}
            layout={width > 1024 ? "vertical" : "horizontal"}
            column={Object.keys(dataKeys).length % 3 === 0 ? 3 : 2}
        >
            {Object.keys(dataKeys).map((key) => (
                <Item key={key} label={dataKeys[key]}>
                    {data[key]}
                </Item>
            ))}
        </Descriptions>
    );
}

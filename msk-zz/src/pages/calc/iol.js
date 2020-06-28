import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Button, Upload, Form } from 'antd';
import { useIntl } from 'react-intl';
import { go } from 'components/User';
import { uploadIOL } from 'api/pay';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function IOL() {
    const intl = useIntl();
    const history = useHistory();
    const [file, setFile] = useState(null);
    const lang = useSelector(state => state.locale.lang);

    function upload() {
        go().then(user => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.id);
            uploadIOL.send(formData)
                .then(data => {
                    console.log(data);
                });
            // console.log(user);
            // 上传文件
            // console.log(values);
            // 支付

            // 计算

            // pay({ outTradeNo: new Date().getTime() }).then(data => {
            //     console.log(data);
            //     const formWrapper = document.createElement('div');
            //     document.body.append(formWrapper);
            //     formWrapper.innerHTML = data.result;
            //     document.forms[1].submit()
            // })
        }).catch(e => { });
    }

    function beforeUpload(file) {
        setFile(file);
        return true;
    }

    function goPage() {
        history.push(`/${lang}/user/list`);
    }

    return <React.Fragment>
        <Tip method="IOL" tips={['NOTES', 'RAWDATA', "PAY"]} />
        <div className="calculate-wrapper">
            <Form onFinish={upload}>
                <Button.Group>
                    <Form.Item
                        name="file"
                        valuePropName="fileList"
                        getValueFromEvent={e => e.file}
                        rules={[{ required: true, message: '请上传文件' }]}
                    >
                        <Upload beforeUpload={beforeUpload} customRequest={() => { }} showUploadList={false}>
                            <Input readOnly />
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType='submit'>上传</Button>
                </Button.Group>
                <Button type="link" onClick={goPage}>查询结果</Button>
            </Form>
        </div>
    </React.Fragment>
}
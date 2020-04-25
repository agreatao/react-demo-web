import { Button, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import './index.less';

const _Form = connect(
    ({ locale }) => ({ lang: locale.lang })
)(
    function CForm(props) {
        const { children, onFinish, lang, dispatch, ...restProps } = props;
        const [form] = Form.useForm();

        const intl = useIntl();

        useEffect(() => {
            form.resetFields();
        }, [lang])

        const validateMessages = {
            required: intl.formatMessage({ id: 'RULE_REQUIRED' })
        }

        function reset() {
            form.resetFields();
        }

        const formLayout = {
            labelCol: {
                sm: { span: 10 }
            },
            wrapperCol: {
                sm: { span: 14 }
            }
        }

        const formLastLayout = {
            wrapperCol: {
                sm: { span: 19, offset: 5 }
            }
        }

        const layout = {
            xs: 24,
            sm: 12
        }

        const childrenGroup = {};
        React.Children.forEach(children, child => {
            const { group = 'default' } = child.props;
            if (!childrenGroup[group]) childrenGroup[group] = [];
            childrenGroup[group].push(child);
        });

        return <Form {...restProps} className="calculate-form" form={form} onFinish={onFinish} validateMessages={validateMessages} {...formLayout}>
            {Object.keys(childrenGroup).map(group =>
                <Row key={group} className="form-group">
                    {React.Children.map(childrenGroup[group], (child) => <Col {...layout}>{child}</Col>)}
                </Row>
            )}
            <Form.Item {...formLastLayout}>
                <Button size="large" className="calculate-btn" htmlType="submit" type="primary">{intl.formatMessage({ id: 'CALCULATE' })}</Button>
                <Button size="large" className="calculate-btn" onClick={reset}>{intl.formatMessage({ id: 'CLEAR' })}</Button>
            </Form.Item>
        </Form>
    }
)

_Form.Item = Form.Item;

export default _Form;
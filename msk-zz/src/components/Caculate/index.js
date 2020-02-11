import { Button, Col, Form, Input, Row, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearResult, fetchResult } from 'store/actions';
import { lowerCase, upperFirst } from 'lodash';
import './index.less';

export default connect(
    ({ caculate }) => ({ formItems: caculate.formItems, result: caculate.result, method: caculate.method }),
    dispatch => bindActionCreators({
        fetchResult,
        clearResult
    }, dispatch)
)(Form.create()(
    function Caculate({ form, formItems, method, result, fetchResult, clearResult }) {
        const intl = useIntl();

        const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form;

        const [visible, setVisible] = useState(result && JSON.stringify(result) !== '{}');

        useEffect(() => {
            const browser_width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
            if (browser_width <= 576)
                setVisible(result && JSON.stringify(result) !== '{}');
        })

        function handleCalculate(e) {
            e.preventDefault();
            validateFieldsAndScroll((err, params) => {
                if (err) return;
                fetchResult(method, params);
            })
        }

        function handleClear(e) {
            e.preventDefault();
            resetFields();
            clearResult();
        }

        return <div className='caculate'>
            <Row gutter={{ xs: 0, sm: 0, md: 8, lg: 8 }}>
                <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                    <Form className='c-form' labelCol={{ xs: { span: 10 }, sm: { span: 10 } }} wrapperCol={{ xs: { span: 14 }, sm: { span: 14 } }}>
                        <Row gutter={{ xs: 0, sm: 0, md: 16, lg: 16 }}>
                            {formItems && formItems.map(item =>
                                <Col key={item.name} xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item label={item.label || item.name}>
                                        {
                                            getFieldDecorator(item.name, {
                                                initialValue: item.default,
                                                rules: item.rules && item.rules.map(rule => {
                                                    const { message, ...props } = rule || {};
                                                    const { id, ...labels } = message || {};
                                                    return {
                                                        ...props,
                                                        message: intl.formatMessage({ id }, labels)
                                                    }
                                                })
                                            })(<Input autoComplete='off' />)
                                        }
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Row gutter={[{ xs: 0, sm: 0, md: 16 }, { xs: 8, sm: 8, md: 0 }]}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Button type='primary' className='form-btn' onClick={handleCalculate}>{intl.formatMessage({ id: 'CALCULATE' })}</Button>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Button className='form-btn' onClick={handleClear}>{intl.formatMessage({ id: 'CLEAR' })}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={0} sm={0} md={10} lg={10} xl={10} xxl={10}>
                    <div className="result">
                        {result && Object.keys(result).map(item =>
                            <div key={item}>
                                <label>{lowerCase(item).split(' ').map(item => upperFirst(item)).join(' ')}: </label>
                                <span>{result[item]}</span>
                            </div>)}
                    </div>
                </Col>
                <Modal visible={visible} footer={false} onCancel={() => clearResult()}>
                    <div className="result">
                        {result && Object.keys(result).map(item =>
                            <div key={item}>
                                <label>{lowerCase(item).split(' ').map(item => upperFirst(item)).join(' ')}: </label>
                                <span>{result[item]}</span>
                            </div>)}
                    </div>
                </Modal>
            </Row>
        </div>
    }
))
import React, { Component } from 'react';
import { Form, Col, Row } from 'antd';
import container from './indexContainer.jsx'
// 引入组件
import CompMap from './component/index.jsx';
// 引入工具
import { ActionType } from './utils';

class Index extends Component {
    constructor(props) {
        super(props)
        const { jsonSchema } = props
        const { properties: { formList = {}, formProps = {}, rowProps = {} } } = jsonSchema
        this.state = {
            formProps,
            rowProps,
            formList
        }
    }
    // 拦截函数 处理联动配置
    handleFormItemChange = ({ kId, value }) => {
        const { onFormItemChange } = this.props
        const { formList } = this.state
        const targetObj = formList.find((_item) => _item.kId === kId)
        if (!Array.isArray(targetObj.linkageOptions) || !targetObj.linkageOptions.length) {
            onFormItemChange && onFormItemChange({ kId, value })
            return
        }
        let linkageValue = {}
        targetObj.linkageOptions.forEach((_item) => {
            linkageValue = this.handleLinkage({ linkageItem: _item, linkageValue, value: value[targetObj.title] })
        });
        onFormItemChange && onFormItemChange({ kId, value: { ...value, ...linkageValue } })
    }
    // 处理联动
    handleLinkage = ({ linkageItem, linkageValue, value }) => {
        const { formList } = this.state
        const { targetId, actionType, placeholder, curValue } = linkageItem
        const targetObj = formList.find((_item) => _item.kId === targetId)
        const { title } = targetObj
        linkageValue[title] = ''
        switch (actionType) {
            case ActionType.clear:
                {
                    this.props.form.setFieldsValue({ [title]: '' })
                }
                break;
            case ActionType.setPlaceholder:
                {
                    this.props.form.setFieldsValue({ [title]: '' })
                    targetObj.componentProps.placeholder = placeholder
                    this.setState({ formList })
                }
                break;
            case ActionType.setCurValue:
                {
                    linkageValue[title] = curValue
                    this.props.form.setFieldsValue({ [title]: curValue })
                }
                break;

            case ActionType.fetchData:
                {
                    this.props.form.setFieldsValue({ [title]: '' })
                    targetObj['_optionList'] = targetObj.getOptions({ value })
                    this.setState({ formList })
                }
                break;
            default:
                break;
        }
        return linkageValue
    }
    // 获取Form表单的值
    getFormValues() {
        return this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                return values
            } else {
                return Promise.reject(false)
            }
        }
        )
    }
    // 获取组件实列
    getComponentInstance = (item) => {
        // const { onFormItemChange } = this.props
        const { componentName } = item
        // 获取组件实例
        const compInstance = CompMap[componentName]
        if (!compInstance) return null
        return React.createElement(compInstance, {
            ...item,
            onFormItemChange: (value) => this.handleFormItemChange(value)
            // onFormItemChange
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { formProps, rowProps, formList } = this.state
        return (
            <Form {...formProps}>
                <Row {...rowProps}>
                    {
                        formList.length && formList.map((_item) => {
                            const { title = '', kId = 0, rules = [], trigger = 'onChange',
                                componentProps: { defaultValue = '' },
                                colProps = {},
                                formItemProps = {}
                            } = _item

                            return (
                                <Col {...colProps} span={parseInt(colProps.span) || 24} key={kId}>
                                    <Form.Item {...formItemProps} >
                                        {getFieldDecorator(title, {
                                            initialValue: defaultValue,
                                            trigger: trigger,
                                            rules: rules
                                        })(
                                            this.getComponentInstance(_item)
                                        )}
                                    </Form.Item>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Form>
        )
    }
}

export default container(Form.create()(Index))
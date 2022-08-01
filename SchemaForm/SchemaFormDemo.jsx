import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
// Form 组件
import SchemaForm from './index.jsx';
// 数据源
import { stroySchema, createSchema, GangedSchema, UISchema, BusinessSchema } from './config';
const { TabPane } = Tabs;

class SchemaFormDemo extends Component {
    constructor() {
        super()
        this.state = {
            formData: {}
        }
        this.childRef = null
    }
    // Tab change
    callback = () => {
        this.setState({ formData: {} })
    }
    // set Ref
    setChildRef = (ref) => {
        this.childRef = ref
    }
    // Form Item Change
    handleFormItemChange = ({ kId, value }) => {
        console.log('handleFormItemChange----->', kId, value);
        let { formData } = this.state
        formData = {
            ...formData,
            ...value
        }
        this.setState({ formData }, () => {
            console.log('formData----->', this.state.formData);
        })
    }
    // 获取整个Form的值
    getFormValue = async () => {
        const res = await this.childRef.getFormValues()
        console.log('整个Form的值::::::::>', res);
    }
    render() {
        return (<div style={{ padding: '20px 200px' }}>
            <Button type="primary" onClick={this.getFormValue}>获取表单值</Button>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="新建长篇故事" key="1">
                    <SchemaForm
                        wrappedComponentRef={this.setChildRef}
                        jsonSchema={stroySchema}
                        filterIdList={[]}
                        onFormItemChange={this.handleFormItemChange}
                    />
                </TabPane>
                <TabPane tab="新建需求" key="2">
                    <SchemaForm
                        wrappedComponentRef={this.setChildRef}
                        onFormItemChange={this.handleFormItemChange}
                        jsonSchema={createSchema}
                    />
                </TabPane>

                <TabPane tab="UI组件实例" key="3">
                    <SchemaForm
                        wrappedComponentRef={this.setChildRef}
                        onFormItemChange={this.handleFormItemChange}
                        jsonSchema={UISchema}
                    />
                </TabPane>
                <TabPane tab="业务组件实例" key="4">
                    <SchemaForm
                        wrappedComponentRef={this.setChildRef}
                        onFormItemChange={this.handleFormItemChange}
                        jsonSchema={BusinessSchema}
                    />
                </TabPane>
                <TabPane tab="组件联动" key="6">
                    <p>1、清空其他组件的值</p>
                    <p>2、修改其他组件的默认值</p>
                    <p>3、修改其他组件的值</p>
                    <p>4、重新拉取服务器数据，更换组件值</p>
                    <SchemaForm
                        wrappedComponentRef={this.setChildRef}
                        onFormItemChange={this.handleFormItemChange}
                        jsonSchema={GangedSchema}
                    />
                </TabPane>
            </Tabs>
        </div >
        )
    }
}

export default SchemaFormDemo
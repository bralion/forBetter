import React, { Component } from 'react';
// 导入工具
import { filterListById, filterListByHidden, filterListByIds, dealGetOptionsFunc } from './utils';
function container(Comp) {
    class Wraper extends Component {
        constructor() {
            super()
        }
        // 拦截函数 处理联动配置
        // handleFormItemChange = (value) => {
        //     console.log('--理联动配---se');
        //     const { jsonSchema: { properties: { formList = [] } } } = this.props
        //     formList.forEach((_item) => {

        //         if (_item.linkageOptions && Object.keys(_item.linkageOptions).length) {
        //             const { targetId, actionType } = _item.linkageOptions
        //             this.handleLinkage(targetId, actionType, formList)
        //         }
        //     });
        //     this.props.onFormItemChange(value)
        // }
        // // 处理联动
        // handleLinkage = (targetId, actionType, formList) => {
        //     const targetObj = formList.find((_item) => _item.kId === targetId)
        //     if (actionType === 'clear') {
        //         console.log('props', Comp);
        //         targetObj.componentProps.defaultValue = 'xxxx0'
        //     }
        // }
        render() {
            const { jsonSchema = {}, filterIdList = [] } = this.props
            let { formList } = jsonSchema.properties
            // 1、过滤重复ID
            formList = filterListById(formList)
            // 2、过滤属性是isHidden的数据
            formList = filterListByHidden(formList)
            // 3、根据用户传入的数组，过滤数据
            formList = filterListByIds(formList, filterIdList)
            // 4、处理getOptions 方法
            formList = dealGetOptionsFunc(formList)
            // 5、formList重新赋值给jsonSchmea
            jsonSchema.properties.formList = formList
            return (<>
                <Comp
                    {...this.props}
                    jsonSchema={jsonSchema}
                />
            </>)
        }
    }
    return Wraper
}

export default container
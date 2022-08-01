// 组件联动的类型
export const ActionType = {
    clear: 'CLEAR',
    setPlaceholder: 'SET_PLACEHODER',
    setCurValue: 'SET_CUR_VALUE',
    fetchData: 'FETCH_DATA'
}
// 根据id过滤重复数据
export const filterListById = (list = []) => {
    const res = new Map()

    return list.filter((_item) => !res.has(_item.kId) && res.set(_item.kId, 1))
}

// 根据属性hidden过滤重复数据
export const filterListByHidden = (list = []) => {

    return list.filter((_item) => !_item.isHidden)
}

// 根据id list过滤重复数据
export const filterListByIds = (list = [], targetList) => {
    if (!targetList || !targetList.length) return list

    return list.filter((_item) => !targetList.includes(_item.kId))
}
// 处理联动的select
export const dealGetOptionsFunc = (list) => {
    if (!list || !list.length) return list
    return list.map((_item) => {
        return {
            ..._item,
            '_optionList': _item.getOptions && _item.getOptions()
        }
    })
}
// const FormPropList = ['colon', 'disabled', 'component', 'fields', 'form', 'initialValues', 'labelAlign', 'labelWrap', 'labelCol', 'layout', 'name', 'preserve', 'requiredMark', 'scrollToFirstError', 'size', 'validateMessages', 'validateTrigger', 'wrapperCol', 'onFieldsChange', 'onFinish', 'onFinishFailed', 'onValuesChange']
// const FormItemPropList = []
// const RowPropList = ['align', 'gutter', 'justify', 'wrap']
// const ColPropList = ['flex', 'offset', 'order', 'pull', 'push', 'span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

// // 过滤 Form 不存在的属性
// export const filterFormProps = (list = [], targetList) => { }
// // 过滤 Form Item 不存在的属性
// export const filterFormItemProps = (list = [], targetList) => { }
// // 过滤 Row 不存在的属性
// export const filterRowProps = (list = [], targetList) => { }
// // 过滤 Col 不存在的属性
// export const filterColProps = (target) => {
//     if (!Object.keys(target).length) {
//         return target
//     }
//     for (const key in target) {
//         if (Object.hasOwnProperty.call(target, key)) {
//             if (!ColPropList.includes(key)) {
//                 throw new Error('请检查，正确的属性')
//                 break
//             }
//         }
//     }
//     return target
// }

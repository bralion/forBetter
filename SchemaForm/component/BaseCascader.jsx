import React, { forwardRef } from 'react';
import { Cascader } from 'antd';

const BaseCascader = (props) => {
    const handleChange = (value) => {
        const { onChange, onFormItemChange } = props
        if (onChange) {
            onChange(value)
        }
        if (onFormItemChange) {
            const { kId = '', title = '' } = props
            onFormItemChange({ kId, value: { [title]: value } })
        }
    }
    const {
        getOptions,
        componentProps = {}
    } = props
    return (
        <Cascader
            {...componentProps}
            options={getOptions && getOptions()}
            onChange={(value) => handleChange(value)}
        />
    )
}
export default forwardRef(BaseCascader)

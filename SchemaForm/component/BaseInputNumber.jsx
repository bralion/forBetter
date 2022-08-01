import React, { forwardRef } from 'react';
import { InputNumber } from 'antd';

const BaseInputNumber = (props) => {
    const {
        value,
        componentProps = {},
        componentProps: { width = '100%' }
    } = props

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
    return (
        <InputNumber
            {...componentProps}
            style={{ width: width }}
            value={value}
            onChange={(value) => handleChange(value)}
        />
    )
}
export default forwardRef(BaseInputNumber)
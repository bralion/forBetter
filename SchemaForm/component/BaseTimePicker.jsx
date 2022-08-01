import React, { forwardRef } from 'react';
import { TimePicker } from 'antd';

const BaseTimePicker = (props) => {
    const {
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
        <TimePicker
            {...componentProps}
            style={{ width: width }}
            onChange={(time, timeString) => handleChange(timeString)}
        />
    )
}
export default forwardRef(BaseTimePicker)
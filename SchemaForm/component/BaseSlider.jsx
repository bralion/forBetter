import React, { forwardRef } from 'react';
import { Slider } from 'antd';

const BaseSlider = (props) => {
    const { value, componentProps = {} } = props
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
        <Slider
            {...componentProps}
            value={value}
            onChange={(value) => handleChange(value)}
        />
    )
}
export default forwardRef(BaseSlider)
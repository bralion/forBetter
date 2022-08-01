import React, { forwardRef } from 'react';
import { Input, Icon } from 'antd';
const { TextArea } = Input;

const BaseTextArea = (props) => {
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
        <TextArea
            {...componentProps}
            value={value}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(event) => handleChange(event.target.value)}
            rows={4}
        />
    )
}
export default forwardRef(BaseTextArea)
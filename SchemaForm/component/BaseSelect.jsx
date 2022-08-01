import React, { forwardRef } from 'react';
import { Select } from 'antd';
const { Option } = Select;

const BaseSelect = (props) => {
    const { getOptions, _optionList = [], value, componentProps = {} } = props

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

    const optionList = _optionList.length ? _optionList : getOptions && getOptions()
    return (
        <Select
            {...componentProps}
            value={value}
            onChange={(value) => handleChange(value)}
        >
            {optionList.map(_item => {
                const { title, value } = _item
                return <Option key={value} value={value}>{title}</Option>
            })}
        </Select>
    )
}
export default forwardRef(BaseSelect)
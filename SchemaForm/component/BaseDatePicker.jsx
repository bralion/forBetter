import React, { forwardRef } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const BaseDatePicker = (props) => {
    const handleChange = (value) => {
        const { onChange, onFormItemChange } = props
        if (onChange) {
            onChange(moment(value))
        }
        if (onFormItemChange) {
            const { kId = '', title = '' } = props
            onFormItemChange({ kId, value: { [title]: value } })
        }
    }
    const {
        value = '',
        componentProps = {},
        componentProps: { width = '100%' }
    } = props
    return (
        <DatePicker
            {...componentProps}
            style={{ width: width }}
            value={value}
            onChange={(date, dateString) => handleChange(dateString)}
        />
    )
}
export default forwardRef(BaseDatePicker)
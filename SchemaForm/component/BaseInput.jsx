import React from 'react';
import { Input, Icon } from 'antd';
class BaseInput extends React.Component {
    constructor() {
        super()
    }
    handleChange = (value) => {
        const { onChange, onFormItemChange } = this.props
        if (onChange) {
            onChange(value)
        }
        if (onFormItemChange) {
            const { kId = '', title = '' } = this.props
            onFormItemChange({ kId, value: { [title]: value } })
        }
    }
    render() {
        const {
            onPressEnter,
            maxLength,
            value,
            componentProps = {}
        } = this.props

        return (
            <Input
                {...componentProps}
                value={value}
                maxLength={maxLength}
                onPressEnter={onPressEnter}
                onChange={(event) => this.handleChange(event.target.value)}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
        )
    }
}
export default BaseInput
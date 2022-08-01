import React, { forwardRef } from 'react';
import { Checkbox } from 'antd';

const BaseCheckbox = (props) => {
    const { onChange } = props
    const { componentProps = {} } = props

    return (
        <Checkbox
            {...componentProps}
            onChange={onChange}
        >
            Checkbox
        </Checkbox>
    )
}
export default forwardRef(BaseCheckbox)
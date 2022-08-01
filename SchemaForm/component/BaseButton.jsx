import React, { forwardRef } from 'react';
import { Button } from 'antd';

const BaseButton = (props) => {
    const { componentProps = {} } = props

    return (
        <Button
            {...componentProps}
            type="primary"
        >
            Primary
        </Button>
    )
}
export default forwardRef(BaseButton)

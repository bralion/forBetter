import React, { Component } from 'react';
import { Radio } from 'antd';

class BaseRadio extends Component {
    constructor() {
        super()
    }
    render() {
        const { componentProps = {} } = this.props
        return (
            <Radio
                {...componentProps}
            >Radio</Radio>
        )
    }

}
export default BaseRadio
import React, { Component } from 'react';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

class BaseTreeSelect extends Component {
    constructor() {
        super()
    }
    componentDidMount() { }

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
            getTreeData,
            // value,
            componentProps = {},
            componentProps: { width = '100%' }
        } = this.props
        return (
            <TreeSelect
                {...componentProps}
                // value={value}
                treeData={(typeof getTreeData === 'function') ? getTreeData() : getTreeData}
                style={{ width: width }}
                onChange={(value) => this.handleChange(value)}
            >
                <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                        <TreeNode value="leaf1" title="my leaf" key="random" />
                        <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
        );
    }
}

export default BaseTreeSelect
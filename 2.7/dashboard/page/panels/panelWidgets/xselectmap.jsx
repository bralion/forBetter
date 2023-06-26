import React, {Component} from 'react';
import {TreeSelect, Row, Col} from 'antd';


import _ from 'lodash';


// name,value, onChange, options
class XSelectMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextState, this.state) &&
            (nextProps.value == this.state.value) &&
            (nextProps.name == this.props.name) &&
            (_.isEqual(nextProps.options, this.props.options)
            )) {
            return false;
        }
        return true;
    }

    onChange(e) {
        this.setState({
            value: e
        }, () => {
            this.props.onChange && this.props.onChange(e);
        })
    }

    render() {
        return (
            <div>
                <Row type="flex" align="middle">
                    <Col span={6}>{this.props.name}</Col>
                    <Col span={18}>
                        <TreeSelect
                            style={{width: '100%'}}
                            value={this.state.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={this.props.options}
                            placeholder="Please select"
                            treeDefaultExpandAll={false}
                            onChange={e=>this.onChange(e)}
                        />
                    </Col>
                </Row>

            </div>
        )

    }
}


export default XSelectMap;
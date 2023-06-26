import React, { Component } from "react";
import { Row, Col, Radio } from "antd";
import _ from "lodash";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
//RadioGroup bug  onChange事件会触发两次 为避免 设置函数防抖
// name,value, onChange, options
class XRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            _.isEqual(nextState, this.state) &&
            nextProps.value == this.state.value &&
            nextProps.name == this.props.name &&
            _.isEqual(nextProps.options, this.props.options)
        ) {
            return false;
        }
        return true;
    }

    onChange(e) {
        this.timer =
            this.timer ||
            setTimeout(() => {
                this.setState(
                    {
                        value: e
                    },
                    () => {
                        this.props.onChange && this.props.onChange(e);
                    }
                );
                this.timer = null;
            }, 200);
    }
    render() {
        return (
            <Row type="flex" align="middle">
                <Col span={6}>{this.props.name}</Col>
                <Col span={18}>
                    <RadioGroup
                        value={this.state.value}
                        onChange={e => this.onChange(e.target.value)}
                    >
                        {this.props.options.map((option, i) => {
                            return (
                                <RadioButton key={i} value={option.value}>
                                    {option.name}
                                </RadioButton>
                            );
                        })}
                    </RadioGroup>
                </Col>
            </Row>
        );
    }
}

export default XRadio;

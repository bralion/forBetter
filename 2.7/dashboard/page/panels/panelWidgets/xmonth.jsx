import React, { Component } from "react";
import { Row, Col, DatePicker } from "antd";
import moment from "moment";
import _ from "lodash";

const { MonthPicker } = DatePicker;

// name, icons, defaultValue, value, onChange
class XMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
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
            nextProps.name == this.props.name
        ) {
            return false;
        }
        return true;
    }

    onChange(e) {
        this.setState(
            {
                value: e
            },
            () => {
                this.props.onChange && this.props.onChange(e);
            }
        );
    }
    render() {
        return (
            <Row type="flex" align="middle">
                <Col span={6}>{this.props.name}</Col>
                <Col span={18}>
                    <MonthPicker
                        format ='YYYY/MM/DD'
                        value={this.state.value ? moment(this.state.value) : ""}
                        onChange={(e, y) => this.onChange(y)}
                    />
                </Col>
            </Row>
        );
    }
}

export default XMonth;

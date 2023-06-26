/**
 * 局部加载loading
 */
import React, { Component } from "react";

export default class DivLoading extends Component {
    constructor(props) {
        super();
        this.state = {
            showLoading: props.show
        }
    }

    componentWillReceiveProps(n,o){
        if(n.show === false){
            setTimeout(()=>{
                this.setState({
                    showLoading: false
                });
            },200)
        }
        if(n.show === true){
            this.setState({
                showLoading: true
            });
        }
    }

    render() {
        let { text, showText } = this.props;
        let { showLoading } = this.state;

        text = text || '加载中';

        if( showText !== false ){
            showText = true;
        }

        return (
            <div
                className="ds-div-loading"
                style={{
                    display: showLoading ? "block" : "none"
                }}
            >
                {showText && <span>{text}</span>}
            </div>
        );
    }
}

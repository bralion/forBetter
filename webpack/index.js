/**
 * @file entry file
 * @author yangcl120
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            showSetting: false
        };

        this.getList()
            .then(({data}) => {
                this.setState({
                    list: data
                });
            });
    }

    getList() {
        return fetch('http://localhost:8099/list')
            .then(res => res.json());
    }

    render() {
        return (<div className="container1">
          我是主组件
        </div>);
    }

    skip() {
        console.log('开始跳转!');
    }

}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);

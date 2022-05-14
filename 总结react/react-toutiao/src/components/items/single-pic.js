/**
 * @file entry file
 * @author yuanxin
 */
import React, {Component} from 'react';
import {itemFy, clickAble} from './decorators';

@itemFy(true)
export default class SinglePic extends Component {

	static classes = 'single-pic';

	render() {
		return (<div className="content">
				单图
			</div>);
	}
}
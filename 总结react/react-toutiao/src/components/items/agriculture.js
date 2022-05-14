/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import {itemFy} from './decorators';
import Echarts from './echarts';

@itemFy()
export default class Agriculture extends Component {

	static classes = 'agriculture';

	render() {
		return (<div className="content">
				农业
				<Echarts />
			</div>);
	}
}
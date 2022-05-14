/**
 * @file entry file
 * @author yuanxin
 */
import React, {Component} from 'react';
import style from './setting.css';
import TabContext from './tab-context';

export default class Setting extends Component {

	static contextType = TabContext;

	render() {
		return (<div className="setting">
				{this.context.map(tab => {
					return <li>{tab.name}</li>
				})}
			</div>);
	}
}
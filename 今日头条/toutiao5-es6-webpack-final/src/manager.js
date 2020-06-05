/**
* @Description:
* @author Yangchaolin
* @date 2020/6/3
*/
import  Component from './items'
console.log(Component,'Component')
import {request} from './utils.js'
const manager = {
	name:'manager',
	listen:function(){
		window.onscroll = function (e) {
			var distance = document.documentElement.offsetHeight - window.screen.height - window.scrollY;
			if (distance < 100) {
				main ();
			}
		};
	},
	getData:function () {
		return request ({url:'http://localhost:8099/list',method:'post'}).then (res => {
			return res.data
		});
	},
	renderData:function (data = []) {
		// var container = document.getElementById ('container')
		// var flagFrame = container.innerHTML;
		data.map (item => {
			console.log(item);
			let componentType = item.type.replace(/^\w/g,w => w.toUpperCase());
			console.log(componentType)
			var component = new Component[componentType](item.data);
			console.log(component,'component');
			document.getElementById('container').appendChild(component.constructElement());
			// flagFrame += components[item.type] (item)
		})
		
		
	},
	init : function () {
		this.getData ().then (data => {
			this.renderData (data)
		});
		this.listen ();
	}
}

export default manager

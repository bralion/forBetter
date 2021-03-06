/**
* @Description:
* @author Yangchaolin
* @date 2020/6/3
*/

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
		return fetch ('http://localhost:8099/list').then (res => {
			return res.json ();
		}).then (res => {
			return res.data
		});
	},
	renderData:function (data = []) {
		var container = document.getElementById ('container')
		var flagFrame = container.innerHTML;
		import('./components.js').then(({default:components})=>{
			console.log(components);
			data.map (item => {
				console.log(item)
				flagFrame += components[item.type] (item)
			})
			container.innerHTML = flagFrame;
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

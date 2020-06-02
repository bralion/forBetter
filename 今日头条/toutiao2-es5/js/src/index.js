define('js/src/index',['./components'],function(components){
	console.log(components)
	let manager={
		listen:function(){
			window.onscroll = function (e) {
				console.log(111)
				var distance = document.documentElement.offsetHeight - window.screen.height - window.scrollY;
				if (distance < 100) {
					console.log(1111)
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
			let renderMap =components;
			data.map (item => {
				console.log(item)
				flagFrame += renderMap[item.type] (item)
			})
			container.innerHTML = flagFrame;
		},
		init : function () {
			this.getData ().then (data => {
				this.renderData (data)
			});
			this.listen ();
		}
	};
	return manager
})

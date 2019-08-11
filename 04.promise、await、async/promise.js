(function(){
	function Promise(processor){
		this.status='pending';
		processor(
			function(){//reslove
				this.sattus='fulfilled';
			},
			function () {//reject
				this.sattus='rejected';
			},
		)
	}
	Promise.prototype={

	}
})()
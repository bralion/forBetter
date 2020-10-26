//在代码执行之前--在不改变原来逻辑的情况下 增加逻辑

function oldFunction(val){
	console.log('执行了原来的函数，参数为   :'+val)
}

function main(){
	//在执行老函数前改写老函数
	//1.保存老函数引用
	var _oldFunction=oldFunction;
	//2. 改写老函数
	oldFunction = function(){
		let _arguments = arguments;
		console.log('执行老函数之前执行的函数位置')
		_oldFunction.apply(this,_arguments);//执行老函数
		console.log('执行老函数之后执行的函数位置')

	};
	//原函数执行
	setTimeout(()=>oldFunction('用户点击了第一项'),1000);//模拟在某种情况下会执行oldfunction
}
main();
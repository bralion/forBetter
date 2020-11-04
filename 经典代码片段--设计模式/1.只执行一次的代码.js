//只执行一次的代码
	//防抖的原理   单例模式的原理
function doOnce (callback){
	let isDone = false;
	return function(){
		if(isDone){
			return
		}
		isDone = true;
		return callback&&callback.apply({},arguments)
	}
}
let fun1 = function(argument1,argument2){
	return argument1 + argument2
}
let onceFun1 = doOnce(fun1);
console.log(onceFun1(1,2));
console.log(onceFun1(1,2));
console.log(onceFun1(1,2));


// var fun2 = doOnce(function(){
// 	console.log('aaaa1');
// });
// fun2();
// fun2();
// fun2();
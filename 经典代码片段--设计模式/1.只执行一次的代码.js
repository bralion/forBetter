//只执行一次的代码
	//防抖的原理   单例模式的原理
function doOnce (callback){
	let isDone = false;
	return function(){
		if(isDone){
			return
		}
		isDone = true;
		return callback&&callback()
	}
}
var fun1 = doOnce(function(){
	console.log('aaaa');
	return '11111'
});
console.log(fun1());
console.log(fun1());
console.log(fun1());

var fun2 = doOnce(function(){
	console.log('aaaa1');
});
fun2();
fun2();
fun2();
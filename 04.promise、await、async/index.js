/**
 * @usePromise
 * @author yangchaolin
 */
var Promise =require('./promise.js')
console.log(Promise);
var res111=new Promise((reslove,reject)=>{
	console.log('进入第一步');
	reslove(1000);
}).then((res)=>{
	console.log('进入第二步');
	return 2222
}).then((res)=>{
	console.log('进入第三步')
	if(res==2222){
		return new Promise((reslove,reject)=>{
			console.log('进入第四步')
			reslove(3333)
		})
	}
}).then((res)=>{
	console.log('进入第五步')
	return res
})
console.log(res111)
	//输出
		// 进入第一步
		// Promise { <pending> }
		// 进入第二步
		// 进入第三步
		// 进入第四步
		// 进入第五步

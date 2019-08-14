/**
 * @Promise
 * @author yangchaolin
 */



//传入一个函数，函数有两个形参---->reslove,reject
function Promise(processor){
	this.status='pending';
	
	//执行一下processor函数主体部分,并且定义函数的两个参数
	processor(function reslove(res){
		//成功后执行的函数
		this.status='fulFilled';
		console.log('调用了reslove')
		console.log('收到值',res);
		
	},function reject(err){
		console.log('调用了reslove')
		//失败后执行的函数
		this.status='reject';
		
	})

}

Promise.prototype={
	constructor:Promise,
	
}

var res111=new Promise((reslove,reject)=>{
	console.log('进入第一步');
	reslove(1000);
})

module.exports=Promise;

//需要计算超过5秒
function calculate (){
	var startTime,endTime;
	var count=1800000000;
	var sum=0;
	function done(){
		sum++
	}
	var startDate=new Date();
	startTime=startDate.getTime();
	
	while (count--){
		done();
	}
	var endDate=new Date();
	endTime=endDate.getTime();
	console.log('耗时'+(endTime-startTime)/1000+'秒');
}
console.log('加载并执行index')
function yanshi  () {
	calculate();
}
yanshi();

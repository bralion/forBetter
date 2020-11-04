//要将在画布上绘制一个图片拆分成两个小部分  便于复用  便于拆分工作量  便于解耦

//函数1：预处理函数--提供dom 和绘图的image ---张三
function preHandle(callback){
	var dom = 'dom1' //document.getElementById('id1')
	var image = 'image1'//new image();
	// image.src = 'a.png';
	// image.onload=function(){
	// 	callback&&callback({dom,image})
	// }
	callback&&callback({dom,image})
}

//函数2 绘制函数 ---李四
function draw({dom,image}){
	console.log('收到的dom为： ',dom);
	console.log('收到的image为： ',image);
	console.log('开始绘制');
}

//主函数 --- 将流程连起来
function main(){
	preHandle(draw);
}
main()
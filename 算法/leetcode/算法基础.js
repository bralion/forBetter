for(var i=10;i--;){ //i--判断后再减  再执行循环体
    // console.log(i); //9，8...，1，0  所以一般选用后减减
}
for(var i=10;--i;){ //--i 减了之后再判断  再执行循环体
    // console.log(i); //9，8...，1
}
function warp(arr,index,index1){//交换顺序 改变原数组
    [arr[index],arr[index1]]=[arr[index1],arr[index]]
}
    // let arr = [1,2];
    // warp(arr,0,1);
    // console.log(arr);
// do循环
var i = 0;
do {
    console.log(i);//0,1,2,3,4
    i++;
} while (i < 5);

//循环5次
let count =5
while(count--){
    console.log(5);
}
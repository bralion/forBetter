let ArrayData = [4,7,1,54,78];
/**将数组中index位和index位交换一下*/
function swap(arr,index,index1){
    let temp = arr[index1];
    arr[index1] = arr[index];
    arr[index] = temp;
}
/**判断什么时候交换两个的位置**/
function judge(start,end){
    if(start<end){
        return true
    }
    return false
}

function sortData(arr){
    for(let i=arr.length;i>0;i--){
        for(let j=0;j<i-1;j++){
            if(judge(arr[j],arr[j+1])){
                swap(arr,j,j+1);
            }
        }
    };
    return arr
}

console.log(sortData(ArrayData));
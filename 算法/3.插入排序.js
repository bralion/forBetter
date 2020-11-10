
let ArrayData = [4,7,1,54,78,65];

//在数组中将index2处的值插入到index处 index2是最后一个值 所以不影响前面的顺序
function insert(arr,index1,index2){
    let temp = arr.splice(index2,1)[0];
    arr.splice(index1,0,temp);
    return arr
}
////test
// let arr1 = insert([1,2,3],1,2);
// console.log(arr1);

function sort(arr){
    for(let i = arr.length;i>=0;i--){
        for(let j=0;j<i;j++){
            if(arr[j]>arr[i]){
                insert(arr,j,i)
            }
        }
    }
    return arr
}
console.log(sort(ArrayData));
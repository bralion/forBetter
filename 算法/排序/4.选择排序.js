let ArrayData = [4,7,1,54,78,65,32,99];

function chooseSort(arr){
    let res = [];
    for(let i=0,count=arr.length;i<count;i++){//注意要循环length次 arr会变 所以添加一个变量count
        let max = arr[0];
        let maxIndex = 0;
        arr.forEach((item,index)=>{
            if(max<item){
                max = item;
                maxIndex = index;
            }
        });
        res.unshift(arr.splice(maxIndex,1)[0]);
    }
    return res
}

console.log(chooseSort(ArrayData));
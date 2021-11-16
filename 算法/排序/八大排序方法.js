
//概念：时间复杂度是指执行算法所需要的计算工作量；而空间复杂度是指执行这个算法所需要的内存空间。
// 复杂度一般取n趋于无穷大的数量级。用来判断算法的特性和优劣。
//
const mockData = [5,7,9,4,10,21,3,6];
const sort = (arr,start=0,end=arr.length)=>{

  /*  //冒泡排序 ----面试会多一些 时间复杂度为O(n平方) 空间复杂度为 O(1)  ---速记 两两交换
    //因为实际循环次数为（n*(n+1))/2  所以为 n平方，由于是内存内交换排序 所以空间为 O(1);
    function swap(arr,i,j){//将数组中i和j位置进行交换
        if(i===j){
            return
        }
        arr[i] = arr[j] + arr[i];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
    }
    for(let i = 0;i<arr.length;i++){
        for(let j=i+1;j<arr.length;j++){
            if(arr[i]<arr[j]){
                swap(arr,i,j);
            }
        }
    }
    return arr
    //冒泡排序结束*/

    /*//选择排序法 循环挑选出最小的 排在第一位，在剩下的中再选出最大的排在已排好的后面 时间复杂度O(n平方) 空间复杂度O(1)
    function swap(arr,i,j){//将数组中i和j位置进行交换
        if(i===j){
            return
        }
        arr[i] = arr[j] + arr[i];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
    }
    for (let i=0,count=arr.length; i<count;i++){
        let max = arr[i];
        let maxIndex = i;
        for(let j=i;j<count;j++){
          if(arr[j]>max){
              max = arr[j];
              maxIndex = j;
          }
        }
        swap(arr,i,maxIndex)
    }
    return arr
    //选择排序结束*/

  /*  //插入排序法  从前面开始将拿出的数据和它前面进行对比（前面的是已经排好了的），插入到合适的位置，时间复杂度O(n平方) 空间复杂度O(1)
    for (let i=1,count=arr.length;i<count;i++){
        for (let j=0; j<i;j++){
            if(arr[i]<arr[j]){
                swap(arr,i,j);
            }
        }
    }
    function swap(arr,i,j){//将数组中i和j位置进行交换
        if(i===j){
            return
        }
        arr[i] = arr[j] + arr[i];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
    }
    return arr
    //插入排序结束*/

    //快速排序法






}
const res = sort(mockData,0,mockData.length);
console.log('res::::',res);
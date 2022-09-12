const fs = require('fs');
const {parse} = require('csv-parse');

let allData = [];
let needFindData = [];
let result = [];

console.log(parse)

let csvData=[];
fs.createReadStream('./test.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        // console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end',function() {
        //do something wiht csvData
        allData = csvData.map(item=>{
            return parseFloat(item[0].split(',')[0])?parseFloat(item[0].split(',')[0]):0
        }).slice(1)
        needFindData = csvData.map(item=>{
            return parseFloat(item[0].split(',')[3])?parseFloat(item[0].split(',')[3]):0
        }).slice(1)
        needFindData.forEach(item=>{
            let _res = findData(allData,item)
            result.push(_res)
        })



        result.forEach((_res,index)=>{
            if(JSON.stringify(_res)!=='[[],[],[],[]]'){
                _res.forEach((_item,_index)=>{
                    console.log(csvData[index+1][0].split(','),22)
                    console.log(csvData[index+1][0].split(',')[_index+4],33)
                    console.log(_item,44)
                    let handledData=csvData[index+1][0].split(',');
                    handledData[_index+4]=JSON.stringify(_item)
                    csvData[index+1][0] = handledData.join(';');
                })
            }else{//没有数据

            }

        })
        console.log(csvData,222)
    });


function findData(sourceArr, target){
    let res = [[],[],[],[]];
    for(i = 0;i<sourceArr.length;i++){
        //找一个匹配到的
        if(sourceArr[i] === target){
            res[0].push([i])
        }
        for(j = i+1; j<sourceArr.length;j++){
            //找匹配到两个的
            if((sourceArr[i] + sourceArr[j]) ===  target){
                res[1].push([i,j])
            }
            for(k = j+1; k<sourceArr.length;k++){
                //找匹配到三个的
                if((sourceArr[i] + sourceArr[j] + sourceArr[k]) ===  target){
                    res[2].push([i,j,k])
                }
                //找匹配到4个的
                for(l = k+1; l<sourceArr.length;l++){
                    //找匹配到4个的
                    if((sourceArr[i] + sourceArr[j] + sourceArr[k] + sourceArr[l]) ===  target){
                        res[3].push([i,j,k,l])
                    }
                }
            }
        }
    }
    return res
}


//计算完成

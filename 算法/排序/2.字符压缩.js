function handle(str1=''){
    let strList = str1.split('');
    let res = [];
    let word = ''; //保存当前字符
    let count = 0;
    for(let i=0;i<strList.length;i++){
        if(strList[i] === word){
            count++
        }else{
            res.push(word);
            if(count > 1){res.push(count)};
            word = strList[i];
            count = 1;
        }
        if(i=== strList.length-1){
            res.push(word);
            if(count > 1){res.push(count)};
        }
    }
    return res.join('')
}
console.log(handle('aaaaabbbbcwww'));
console.log(handle('a'));
console.log(handle('aertert'));
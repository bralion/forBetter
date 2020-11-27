// 1.实现strStr()函数。
//
// 给定一个haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 -1,当needle为空的时候返回0
//
// 示例 1:
//
// 输入: haystack = "hello", needle = "ll"
// 输出: 2
// 示例 2:
//
// 输入: haystack = "aaaaa", needle = "bba"
// 输出: -1
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
//解题思路 正则.exec返回的是一个对象  未找到为null 找到则index属性表示下标
// 正则.test返回的是一个boolean
// 字符串直接search() 传入正则表达式 直接返回的是找到的第一个的下标 未找到返回-1  不执行全局匹配
var strStr = function(haystack, needle) {
    //解法1
    let reg = new RegExp(needle,'g');
    let findObj = reg.exec(haystack);
    return findObj?findObj.index:-1;
    // 解法2
   // return  haystack.search(needle);//此api类似于[].findIndex
};
strStr('aa1ea1','a1'); //1

//2.给定两个整数，被除数dividend和除数divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
//
// 返回被除数dividend除以除数divisor得到的商。
//
// 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    let dividendType,divisorType;
    dividendType = dividend>0?1:-1;
    divisorType = divisor>0?1:-1;
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    let count = 0;
    while(dividend>=divisor){
        dividend = dividend - divisor;
        count++;
    };
    let res;
    if(divisorType + dividendType === 0){
        res = parseInt('-'+count)
    }else{
        res = count;
    }
    if(-Math.pow(2,31)<=res&&Math.pow(2,31)>res){
        return res
    }else{
        return Math.pow(2,31) - 1
    }
};
// console.log(divide(-10,3));
/**
 * @param {number} n
 * @return {string}
 */
function createList(n){//生成外观数列
    let str = n+''
    let count = str.length
    //双指针模型
    let i = 0;
    let res ='';
    let dataCount = 0;
    for(let j = 1;j<count;j++){
        if(str[i]===str[j]){
            dataCount++
        }else{
            res = res + dataCount+str[i]
            i++;
            dataCount = 0;
        }
    }
    console.log(res);
    return res
}
console.log(createList(1111));
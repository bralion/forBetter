// 1.给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	for(let i=0;i<nums.length;i++){
		for(let j=i+1;j<nums.length;j++){
			if(nums[i]+nums[j]===target){
				return[i,j]
			}
		}
	}
};
// console.log(twoSum([1,2,3,6],9));

// 2.给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
	let _str = '' + x;
	let numList = _str.split('');
	let isPositive = 1;
	if(numList[0]==='-'){isPositive=-1};
	let reverseStr = numList.reverse().join('');
	let res = parseInt(reverseStr)*isPositive;
	let max = Math.pow(2,31);
	if(-max<= res&&res<max){
		return res
	}
	return 0
};
// console.log(reverse(-123));

// 3.判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。 包含负数。
// 注意：Array.reverse和sort函数均是改变原数据
var isPalindrome = function(x) {
	let _str =x + '';
	let numList = _str.split('');
	let reverse = [...numList];
	return reverse.reverse().every((item,index)=>{
		return item === numList[index]
	})
};
// console.log(isPalindrome(-121));


// 4.罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
//
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
//
// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
//
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
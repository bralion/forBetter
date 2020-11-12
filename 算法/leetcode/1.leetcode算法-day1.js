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
function romanToInt(s){
	let mapping = {
		'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000
	};
	let res = 0;
	for(let i=0;i<s.length;i++){
		if(s[i+1]&&mapping[s[i]]<mapping[s[i+1]]){
			res -= mapping[s[i]]
		}else{
			res += mapping[s[i]]
		}
	}
	return res
}
// console.log(romanToInt('III'));


// 5.编写一个函数来查找字符串数组中的最长公共前缀。
//
// 如果不存在公共前缀，返回空字符串 ""。
/**
 * @param {string[]} strs
 * @return {string}
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
	if(!strs[0]){
		return ''
	}
	let minLength = strs[0].length;
	strs.forEach(item=>{
		minLength>item.length&&(minLength = item.length);
	});
	let res = ''
	for(let i = 0;i<minLength;i++){
		let _currentStr = strs[0][i];
		let isContinue = strs.every(item=>{
			return _currentStr === item[i]
		})
		if(isContinue){
			res +=_currentStr
		}else{
			break
		}
	}
	return res
};
// console.log(longestCommonPrefix(['flow','flo2','floww']));

// 6.给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
//
// 有效字符串需满足：
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

/**
 * @param {string} s
 * @return {boolean}
 */
//利用栈的思想

var isValid = function(s) {
	let stringList = s.split('');
	let stack = [];
	let mapping ={
		'{':'}',
		'[':']',
		'(':')',
	}
	for(let i =0;i<stringList.length;i++){
		if(stack[stack.length-1]&&mapping[stack[stack.length-1]]===stringList[i]){
			stack.pop();
		}else{
			stack.push(stringList[i]);
		}
	}
	return stack.length === 0

};
// console.log(isValid("()[]{}"));

// 7.将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
// 示例：
//
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
//链表结构
function ListNode(val,next){
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
var l1 = {
    val:'1',
    next:{
        val:'2',
        next:{
             val:'4',
             next:null
        }
    }
}
var l2 = {
    val:'1',
    next:{
        val:'3',
        next:{
             val:'4',
             next:null
        }
    }
}
var mergeTwoLists = function(l1, l2) {
    let cur = new ListNode();
    let head = cur;
    while(l1&&l2) {
        if(l1.val <= l2.val){
            cur.next = l1 ;
            l1 = l1.next
        }else{
            cur.next = l2 ;
            l2 = l2.next
        }
        cur = cur.next
    }
    if (!l1) cur.next = l2;
    if (!l2) cur.next = l1;
    return head.next;
};
// console.log(JSON.stringify(mergeTwoLists(l1,l2)));

// 8.删除排序数组中的重复项
// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
//
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
//
//
// 示例1:
//
// 给定数组 nums = [1,1,2],
//
// 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
//
// 你不需要考虑数组中超出新长度后面的元素。




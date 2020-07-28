/**
* @Description:
* @author Yangchaolin
* @date 2020/6/9
*/
import MultiplePic  from './multiple-pic.vue';
import SinglePic  from './single-pic.vue';
import Agriculture  from './agriculture.vue';
console.log(MultiplePic.render,'MultiplePic')
console.log(SinglePic,'SinglePic')
export {
	MultiplePic,
	SinglePic,
	Agriculture
}
//简写
// export { default as MultiplePic } from './multiple-pic.vue';
// export { default as SinglePic } from './single-pic.vue';

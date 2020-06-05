/**
* @Description: 入口文件
* @author Yangchaolin
* @date 2020/6/5
*/
import Vue from 'vue'
import Main from './pages/main.vue'

const vm =new Vue(
	{
		el:'#app',
		render:h=>h(Main)
	}
)

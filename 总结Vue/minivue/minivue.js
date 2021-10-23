import initMixin from './vueCore/initMixin.js'
//构造函数
function Vue(options){
    this._init(options);
}
const config = {//全局配置项
    silent:true,
};



initMixin(Vue);



Vue.config = config;
export default Vue
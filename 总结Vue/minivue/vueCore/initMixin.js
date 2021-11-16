//给Vue构造函数添加_init方法用于初始化实例  也是new Vue 调用的函数；实例可以通过该方法初始化组件内的vue实例
export default function initMixin (Vue) {
    let uniId = 0;
    Vue.prototype._init = function (options) {
        this.isVue = true;
        this.id = uniId++;
        // initLifecycle(vm);
        // initEvents(vm);
        // initRender(vm);
        // callHook(vm, 'beforeCreate');
        // initInjections(vm); // resolve injections before data/props
        // initState(vm);
        // initProvide(vm); // resolve provide after data/props
        // callHook(vm, 'created');

    }
}
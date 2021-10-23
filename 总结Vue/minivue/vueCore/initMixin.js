export default function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        this.name = 'vue'
    }
}
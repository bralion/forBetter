/**
 * 组件主文件
 */
export default {
    configLoader: ()=>import('dashboard_2_7/corejs/components/chartBar/widget.config'),
    classLoader: ()=>import('dashboard_2_7/corejs/components/chartBar/widget.class')
}
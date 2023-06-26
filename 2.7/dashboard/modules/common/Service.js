/**
 * 前后端交互层
 * author:twy
 * create time：2018/8/28
 */
import axios from "axios";
import {message} from "antd";

// 创建一个 axios 实例
const service = axios.create({
    baseURL: "" // api的base_url
});

/**
 * 登录超时处理
 */
const onSessionTimeout = function(){
    if(window.top === window){
        window.location.href = './login.html'
    }else{
        let data = {
            type: 'SESSION_TIMEOUT'
        }
        window.top.postMessage(data, "*");
    }
}

// request 拦截
service.interceptors.request.use(
    config => {
        if(!config.params){
            config.params = {};
        }
        config.params.workspaceId = window.dashboardMode.workspaceId
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone 拦截
service.interceptors.response.use(
    response => {
        const res = response.data || {};
        let {code,data,msg} = res;
        let isAlertError = response.config.isAlertError !== false;

        // <临时处理，ajax被重定向了>
        if(typeof response.request.response === 'string' && response.request.response.indexOf('<!doctype html>') !== -1){
            onSessionTimeout();
            return Promise.reject(res);
        }

        if(code === void(0)){
            return res;
        }

        // 超时
        if(code === 401){
            onSessionTimeout();
            return Promise.reject(res);
        }

        if(code === 200){
            return res;
        }else{
            msg && isAlertError && message.error(msg);
            return Promise.reject(res);
        }
        // let res = response.data;
    },
    error => {
        console.log("err" + error); // for debug
        return Promise.reject(error);
    }
);

export default service;

function createSource() {
    return axios.CancelToken.source();
}

export { createSource };

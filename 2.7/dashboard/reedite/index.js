import axios from "axios";
import { Modal, Button, message, Input } from "antd";
import databindM from 'dashboard_2_7/dashboard/modules/business/databind'
import service from 'dashboard_2_7/dashboard/modules/common/Service'
const confirm = Modal.confirm;

/**
  模式           type   path   控制面板
  直接编辑模式   无      无      有
  快照   3      有       无
  再编辑模式    2       有       有
  临时预览模式  1       有       无
  单纯浏览模式   0      有       无
  */

class reEdite {
    static listenHashChange = false;
    constructor() {
        this.path = "";
        this.type = '';
        this.workspaceId = '';
        this.defDatasetId = '';
    }
    getPath() {
        let urlParse = window.Dashboard.util.urlParse;
        let path = urlParse("path", 'search'),
            workspaceId = urlParse("workspaceId", 'search'),
            defDatasetId = urlParse("datasetId", 'search'),
            tabId = urlParse("tabId", 'search'),
            shareId = urlParse("shareId", 'search'),
            type = urlParse("type", 'search');

        //同时保存模式到window下，方便其他地方使用
        window.dashboardMode = {
            name: "edite",
            type,
            workspaceId,
            shareId,
            defDatasetId,
            path,
            tabId
        };

        if (!path) return null;

        if (type === null) {
            type = 0;
        }

        this.path = path;
        this.type = type;
        this.workspaceId = workspaceId;
        this.defDatasetId = defDatasetId;

        Object.assign(window.dashboardMode, {
            name: ["preview", "preview", "edite", "snapshoot"][type]
        });

        return this;
    }
    getRedux() {
        if (this.type == 1) {
            // 是临时预览模式
            let storage = sessionStorage.getItem(this.path);
            if (storage) {
                return Promise.resolve(JSON.parse(storage));
            } else {
                Promise.reject("localstorage has no such data:(");
            }
        } else if (this.type == 0 || this.type == 2) {
            // 单纯浏览模式 或者  再编辑模式   这两种模式 都需要 重新获取数据
            return new Promise((resolve, reject) => {
                service({
                    method: "get",
                    url: '/xdatainsight/api/dashboard/structure',
                    responseType: "json",
                    params: {
                        share: window.dashboardMode.shareId ? true : false,
                        fileGuid: this.path
                    },
                    headers: {
                        "content-type":
                            "application/x-www-form-urlencoded; charset=UTF-8",
                        Accept: "application/json"
                    }
                })
                    .then(response => {
                        let { code, data,msg } = response;
                        if (code === 200) {
                            resolve(data);
                        }else{
                            message.error(msg || '获取仪表盘内容失败。')
                        }
                    })
                    .catch(error => {
                        this.removePath();
                        reject(error);
                    });
            });
        } else if (this.type == 3) {
            let storage = sessionStorage.getItem(this.path);
            if (storage) {
                return Promise.resolve(JSON.parse(storage));
            } else {
                return new Promise((resolve, reject) => {
                    service({
                        method: "get",
                        url: `/xdatainsight/api/repo/files/snapshoot/data${this.path}`,
                        responseType: "json",
                        headers: {
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                            Accept: "application/json"
                        }
                    })
                        .then(response => {
                            let { data } = response;
                            if (typeof data === 'string') {
                                resolve(JSON.parse(response.data || '{}'));
                            } else {
                                resolve(data);
                            }
                        })
                        .catch(error => {
                            this.removePath();
                            reject(error);
                        });
                });
            }


        } else {
            return Promise.resolve(null);
        }
    }
    setRedux(store, data) {
        let { components, datasources, globalParam, filename } = data;
        let dash = window.Dashboard;
        //恢复全局参数数据
        dash.globalParam.addParams(globalParam.params);
        dash.globalParam.globalParam.theme = globalParam.theme;
        //触发主题更新
        window.Dashboard.event.dispatch("themeChange", globalParam.theme);
        //重新编辑的保存地址 以浏览器打开的为准
        let s = this.path.split("/");
        let saveInfo = {
            name: '',
            path: this.path
            // name: s.pop(),
            // path: s.join("/")
        };
        dash.globalParam.globalParam.saveInfo = Object.assign(
            globalParam.saveInfo,
            saveInfo
        );
        dash.globalParam.globalParam.cssAndJs = globalParam.cssAndJs;
        dash.globalParam.globalParam.globelProps = globalParam.globelProps;
        dash.globalParam.globalParam.freshPeriod = globalParam.freshPeriod;
        //抛出参数变化 事件
        window.Dashboard.event.dispatch("globalParam", globalParam);

        //如果是预览模式,打开，注入全局css js 代码
        if (this.type == 1 || this.type == 0 || this.type == 3) {
            //注入css
            let style = document.createElement("style");
            style.setAttribute("name", "custom");
            style.innerHTML = globalParam.cssAndJs.cssCode;
            document.head.appendChild(style);
            //注入js
            let script = document.createElement("script");
            script.setAttribute("name", "custom");
            script.innerHTML = globalParam.cssAndJs.jsCode;
            document.body.appendChild(script);
        }
        //恢复组件展示
        window.Dashboard.event.dispatch("reEditeComponents", components);

        //写入数据绑定中数据集创建的计算字段
        if (data.databind && data.databind.calcField && dash.dataBind) {
            dash.dataBind.calcField = data.databind.calcField;
        }
    }
    removePath() {
        // window.location.hash = '';
        return this;
    }
    //只监听 path=sdfsadfa 这种类型
    addHashChange(callback) {
        window.onhashchange = e => {
            reEdite.listenHashChange = true;
            callback &&
                /^#path=(.+?)$/gi.test(window.location.hash) &&
                callback();
        };
    }
}
const modalError = () => {
    Modal.error({
        title: "错误",
        content: "无法打开此文件，该文件可能被其它工具修改",
        okText: "确定"
    });
};
const restore = (reEditeObj, store) => {
    if (reEditeObj.path) {// 修改 预览
        reEditeObj
            .getRedux()
            .then(redux_data => {
                try {
                    if (!redux_data) {
                        modalError();
                    } else {
                        reEditeObj.setRedux(store, redux_data);
                    }
                } catch (error) {
                    modalError();
                    // message.warn('数据格式错误，编辑失败:(');
                }
            })
            .catch(() => {
                modalError();
            });
    } else {// 新增
        reEditeObj.removePath();

        // 如果是编辑模式，并且需要默认选中数据集，
        // 通过数据集ID从数据集列表中找出该数据集，将数据集信息写入_databind_last_dataset,
        // 达到默认选中该数据集的目的。
        if (window.dashboardMode.defDatasetId) {
            databindM.getDatasetList().then(rep => {
                let dataset = rep.data.filter(item => item.id === window.dashboardMode.defDatasetId)[0];
                window._databind_last_dataset = dataset;
            })
        }
    }
};

const reEditeInstance = store => {
    const reEditeObj = new reEdite();
    reEditeObj.getPath();
    restore(reEditeObj, store);
    // reEditeObj.addHashChange(() => {
    //     reEditeObj.getPath();
    //     restore(reEditeObj, store);
    // });
};

export default reEditeInstance;

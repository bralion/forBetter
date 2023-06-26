import React, { Component } from "react";
import $ from "jquery";
import submit from "dashboard_2_7/dashboard/submit/index";
import DivLoading from "dashboard_2_7/dashboard/components/common/DivLoading";
import {Col,Row,Input,Button,Tree,message} from "antd";
import qs from 'qs'
import service from 'dashboard_2_7/dashboard/modules/common/Service'

const TreeNode = Tree.TreeNode;

function doSubmit(url,method,formData){
    Dashboard.loading(true);
    return new Promise((resolve, reject) => {
        service({
            method: method,
            url: url,
            data: formData,
            responseType: "json",
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "application/json"
            }
        })
            .then(response => {
                let {code,data,msg} = response;
                Dashboard.loading(false);
                if(code === 200){
                    resolve(response);
                }else{
                    message.error(msg || "保存失败，你可能没有权限写入到此目录！");
                    reject(msg);
                }
            })
            .catch(error => {
                Dashboard.loading(false);
                reject(error);
            });
    });
}

/**
 * 保存仪表盘
 * @param {Object} params 
 * @param {Function} cb 
 */
function saveDashboard(params,cb){
    //util工具
    // const _util = window.Dashboard.util;
    let {fileName,folderId,fileId,saveFullPath} = params;
    let dform = new FormData();
    let dsh = new submit();
    let url,method;
    dsh.init();

    // fileId存在表示是修改，否则是新增
    if(fileId){
        url = "/xdatainsight/api/dashboard/editDashboard";
        method = 'put'
        dform.append('fileId',fileId);
    }else{
        url = "/xdatainsight/api/dashboard/saveDashboard";
        method = 'post'
        dform.append('fileName',fileName);
        dform.append('folderId' , folderId);
    }
    
    dform.append('workspaceId',window.dashboardMode.workspaceId);
    dform.append('cdfstructure',JSON.stringify(dsh, "", 1));

    // xdt3.0版本dashboard 不保存缩略图
    dform.append("thumbnail", new Blob());

    // let node = document.querySelector("#background-container");
    // let name = "娃哈哈";
    // _util.downToPngPromise(node, name).then(blob => {
    //     var callback = _blob => {
    //         dform.append("thumbnail", _blob);
            doSubmit(url,method,dform).then(rep => {
                let { data } = rep;
                
                message.success("提交成功 :)");

                window.dashboardMode.path = data;
                window.Dashboard.noticeTopWindow(null,'onSave',{ fileName,fileId:data,isNew:!fileId,saveFullPath });
                
                // 新增保存，添加浏览记录
                if(!fileId){
                    service({
                        url: '/xdatainsight/api/repo/files/recent?fileId='+data,
                        method: 'post',
                        isAlertError:false
                    })
                }

                cb && cb()
                Dashboard.loading(false);
            },(e)=>{
                cb && cb()
                Dashboard.loading(false);
            });
        // };
    //     _util.compressImg(node, blob, callback);
    // }); 
}

export {saveDashboard};

class PanelSave extends Component {
    constructor(props) {
        super(props);
        this.init();
        this.state = {
            treeData: [],
            savePath: this.saveInfo().path,
            saveFullPath:'',
            iconLoading: false,
            spin: true
        };
        this.folderTree = {};
        this.fileName = this.saveInfo().name;
        this.isAllowSubmit = true;
    }
    init() {
        this.saveInfo = this.getSaveInfo();
    }
    componentWillMount() {
        this.setState({
            spin: true
        });
        this.fetchData();
    }
    componentWillUpdate() {}
    componentDidUpdate() {}
    getSaveInfo() {
        let info = window.Dashboard.globalParam.globalParam.saveInfo;
        return function() {
            return info;
        };
    }
    setSaveInfo(newInfo) {
        return Object.assign(
            window.Dashboard.globalParam.globalParam.saveInfo,
            newInfo
        );
    }
    fetchData() {
        let ifhide = false;
        if (
            JSON.parse(localStorage.getItem("userSetting")) &&
            JSON.parse(localStorage.getItem("userSetting")).ifhide
        ) {
            ifhide = JSON.parse(localStorage.getItem("userSetting")).ifhide;
        }
        service({
            method: "get",
            url:"/xdatainsight/api/repo/files/folders",
            params:{
                folder: "",
                fileTypes: "dashboard",
                workspaceId: window.dashboardMode.workspaceId
            }
        }).then(
            response => {
                if (response.code == 200) {
                    this.handleData(response.data);
                }
            },
            err=>{
                this.setState({
                    treeData: [],
                    spin: false
                });
            }
        );
    }
    handleData(data) {
        const recordFullPath = function(node,pPath){
            if(!pPath){
                pPath = node.name
            }else{
                pPath += '/' + node.name
            }

            node.fullpath = pPath;

            if(node.children){
                node.children.forEach(item=>{
                    recordFullPath(item,pPath)
                })
            }
        }
        recordFullPath(data);
        this.setState({
            treeData: [data],
            spin: false
        });
    }
    loopTree(tree, ii) {
        // 递归创建tree的同时，将文件夹做key，文件做value，进行平行化
        return tree.map((el, i) => {
            let {isDir,fileGuid,name,children} = el;
            //文件夹
            // if (el.file.folder == "true") {
            //     !this.folderTree[el.file.path] &&
            //         (this.folderTree[el.file.path] = []);
            // }
            //文件
            // if (el.file.folder == "false") {
            //     let key = el.file.path.substring(
            //         0,
            //         el.file.path.indexOf(el.file.name) - 1
            //     );
            //     if (key) {
            //         //保存文件名，不要后缀
            //         this.folderTree[key].push(el.file.name.split(".")[0]);
            //         //数组去重
            //         this.folderTree[key] = [...new Set(this.folderTree[key])];
            //     }
            // }
            // return <TreeNode key={el.file.path}>2332</TreeNode>

            return (
                <TreeNode nodeData={el} title={name} key={fileGuid}>
                    {children && children.length
                        ? this.loopTree(children)
                        : null}
                </TreeNode>
            );
        });
    }
    onSelect(key, e) {
        let saveFullPath = e.selectedNodes[0].props.nodeData.fullpath;
        this.setState({
            savePath: key[0],
            saveFullPath
        });
        this.isAllowSubmit = this.checkNameGood(this.fileName, key[0]);
    }
    checkNameGood(name, path) {
        if (!name || !path) return null;

        //检查名字是否重复
        if (this.folderTree[path]) {
            if (this.folderTree[path].indexOf(name) > -1) {
                message.warning("文件名重复, 提交将覆盖");
            }
        }
        if (/[\\/:;\?\+#%&\*\|\[\]]+/.test(name)) {
            message.warning("名字不能包含下列字符：\\/:;?+#%&*|[]");
            return false;
        }
        return true;
    }
    fileNameChange(e) {
        this.fileName = e.target.value;
        this.isAllowSubmit = this.checkNameGood(
            this.fileName,
            this.state.savePath
        );
    }
    backtoActiveBeforeSubmit() {
        const { state, dispatch } = this.props;
        const panelCacheID = state.panelCache;

        dispatch({
            type: "updataComponentActive",
            value: {
                id: panelCacheID ? panelCacheID : "canvas",
                data: { base: { state: "active" } }
            }
        });
    }

    dashboardSubmit(type, e) {
        if (type == "cancel") {
            // this.backtoActiveBeforeSubmit();
            window.Dashboard.event.dispatch("panelChange", {
                name: "canvas",
                data: {}
            });
        } else {
            let fileName = $.trim(this.fileName);
            if (fileName === "") {
                message.error("文件名不能为空");
                return;
            }
            if (/[\\/:;\?\+#%&\*\|\[\]]+/.test(fileName)) {
                message.error("名称不能包含下列字符：\\/:;?+#%&*|[]");
                return;
            }
            //reduce数据转换处理
            if (this.isAllowSubmit) {

                this.setState({
                    iconLoading: true
                });

                this.setSaveInfo({
                    path: this.state.savePath,
                    name: this.fileName
                });

                saveDashboard({
                    fileName:fileName,
                    folderId:this.state.savePath,
                    saveFullPath:this.state.saveFullPath
                },()=>{
                    this.setState({
                        iconLoading: false
                    });
                })
            }
        }
    }
    render() {
        let treeNode = this.loopTree(this.state.treeData, 0).filter(el => {
            if (el) {
                return true;
            }
        });
        return (
            <div
                className="panel-row"
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    height: window.innerHeight - 75 + "px"
                }}
            >
                <Row
                    type="flex"
                    style={{ marginBottom: "15px" }}
                    align="middle"
                >
                    <Col span={6}>文件名</Col>
                    <Col span={18}>
                        <Input
                            defaultValue={this.fileName}
                            onChange={e => this.fileNameChange(e)}
                        />
                    </Col>
                </Row>
                <Row type="flex" style={{ marginBottom: "15px" }}>
                    <Col span={6}>保存位置</Col>
                    <Col span={18} style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                    }} title={this.state.saveFullPath}>{this.state.saveFullPath}</Col>
                </Row>
                {/* <Spin tip="Loading" spinning={this.state.spin}> */}
                <div
                    style={{
                        border: "1px solid #d9d9d9",
                        padding: "8px",
                        height: "250px",
                        overflow: "auto",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        position: "relative"
                    }}
                >
                    <Tree onSelect={(key, e) => this.onSelect(key, e)}>
                        {treeNode}
                    </Tree>
                    <DivLoading show={this.state.spin} />
                </div>
                {/* </Spin> */}
                <div>
                    <Row type="flex" style={{ margin: "40px 0 15px" }}>
                        <Col
                            span={18}
                            style={{ textAlign: "right", paddingRight: 20 }}
                        >
                            <Button
                                icon="close"
                                onClick={e => this.dashboardSubmit("cancel", e)}
                            >
                                取消
                            </Button>
                        </Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                            <Button
                                icon="check"
                                type="primary"
                                loading={this.state.iconLoading}
                                onClick={e => this.dashboardSubmit("submit", e)}
                            >
                                提交
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PanelSave;

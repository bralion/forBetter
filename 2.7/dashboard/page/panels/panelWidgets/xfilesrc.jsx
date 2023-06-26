import React, { Component } from "react";
import axios from "axios";
import {
    Col,
    Row,
    Input,
    Popover,
    Button,
    Icon,
    Popconfirm,
    Tree,
    message,
    Spin,
    Upload,
    Radio
} from "antd";
import service from 'dashboard_2_7/dashboard/modules/common/Service'

const { TreeNode} = Tree;
const RadioGroup = Radio.Group;
const imgSrc = require("dashboard_2_7/dashboard/resource/images/icon_dark2.png");
export default class PanelFileSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileType : 'dashboard',
            dashboardData: [],
            portalData: [],
            spin: true,
            savePath: props.value || "",
            showFileList: false
        };
        this.showFileList = this.showFileList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            savePath: nextProps.value || ""
        });
    }

    fetchData(){
        if(this.state.dashboardData.length !== 0 || this.state.portalData.length !== 0){
            this.setState({
                spin : false
            });
        }
        this.changeFileType(this.state.fileType);  
    }

    getIcon = (node)=>{
        let { loading, expanded, isLeaf } = node;
        if (isLeaf === true) {
            return <i className="xm-icon xm-icon-bar" />
        }
        if (loading === true) {
            return <Icon type="loading"></Icon>
        }
        if (expanded === true) {
            return <i className="xm-icon xm-icon-folder-open" />
        } else {
            return <i className="xm-icon xm-icon-folder" />
        }
    } 

     /**
     * 渲染树节点
     * @param {Array} data 
     */
    renderTreeNodes = (data)=>{
        return data.map(item => {
            let {name, isDir, fileGuid, children } = item;
            let isLeaf = !isDir;
            return (
                <TreeNode
                    key={fileGuid}
                    title={name}
                    isLeaf={isLeaf}
                    selectable={isLeaf}
                    icon={this.getIcon}
                    dataRef={item} >
                    {children && children.length && this.renderTreeNodes(children)}
                </TreeNode>
            )
        })
    }

    changeFileType =(fileType, folderId = '')=>{
        let url ;
        if(fileType === "dashboard" && this.state.dashboardData.length === 0){
            url = "/xdatainsight/api/workspace/data/dashboard/ws"  
            service({
                method: "get",
                url: url,
                responseType: "json",
                params :{
                    workspaceId : window.dashboardMode.workspaceId,
                    folderId : folderId
                },
                headers: {
                    "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json"
                }
            }).then(
                response => {
                    this.setState({
                        dashboardData : [...response.data.children],
                        spin: false
                    })
                },
                rej => {
                    this.setState({
                        dashboardData : []
                    })
                }
            );
        }
        if(fileType === "portal" && this.state.portalData.length === 0)
        {
            url = "/xdatainsight/api/workspace/data/portal/ws"
            service({
                method: "get",
                url: url,
                responseType: "json",
                params :{
                    workspaceId : window.dashboardMode.workspaceId,
                    folderId : folderId
                },
                headers: {
                    "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json"
                }
            }).then(
                response => {
                    this.setState({
                        portalData : [...response.data.children],
                        spin: false
                    })
                },
                rej => {
                    this.setState({
                        portalData : []
                    })
                }
            );
        }
    }

    onLoadData = treeNode =>
        new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            let url ;
            if(this.state.fileType === "dashboard"){
                url = "/xdatainsight/api/workspace/data/dashboard/ws"  ;
                service({
                    method: "get",
                    url: url,
                    responseType: "json",
                    params :{
                        workspaceId : window.dashboardMode.workspaceId,
                        folderId : treeNode.props.dataRef.fileGuid
                    },
                    headers: {
                        "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json"
                    }
                }).then(
                    response => {
                        treeNode.props.dataRef.children = response.data.children
                        this.setState({
                            dashboardData: [...this.state.dashboardData],
                            spin: false
                        });
                        resolve();
                    },
                    rej => {
                        this.setState({
                            dashboardData: [],
                            spin: false
                        });
                    }
                );
            }else{
                url = "/xdatainsight/api/workspace/data/portal/ws";
                service({
                    method: "get",
                    url: url,
                    responseType: "json",
                    params :{
                        workspaceId : window.dashboardMode.workspaceId,
                        folderId : treeNode.props.dataRef.fileGuid
                    },
                    headers: {
                        "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json"
                    }
                }).then(
                    response => {
                        treeNode.props.dataRef.children = response.data.children
                        this.setState({
                            portalData: [...this.state.portalData],
                            spin: false
                        });
                        resolve();
                    },
                    rej => {
                        this.setState({
                            portalData: [],
                            spin: false
                        });
                    }
                );
            }
           
    });

    showFileList() {
        const { showFileList } = this.state;

        this.setState(
            {
                showFileList: !showFileList
            },
            () => {
                if (this.state.showFileList) {
                    this.setState({
                        spin: true
                    });
                    this.fetchData();
                }
            }
        );
    }

    _onSelect(key) {
        this.setState(
            {
                savePath: key
            },
            () => {
                this.props.onChange(key);
            }
        );
    }

    render() {
        let { options } = this.props;
        const { showFileList } = this.state;

        return (
            <div
                className="panel-row"
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    height: 50
                }}
            >
                <Row
                    type="flex"
                    style={{ marginBottom: "15px" }}
                    align="middle"
                >
                    <Col span={6}>{this.props.name}</Col>
                    <Col span={12}>
                        <Input
                            value={this.state.savePath}
                            title={this.state.savePath}
                            onChange={e => this._onSelect(e.target.value, e)}
                        />
                    </Col>
                    <Col span={6}>
                        {
                            options.upload ? 
                            <Upload
								action=""
								showUploadList={false}
								beforeUpload={(file,fileList)=>{
                                    let reader = new FileReader();
                                    
                                    let { type } = file;
                                    
									if(!/^image\/(png|jpg|jpeg|gif|bmp)$/i.test(type)){
                                        message.error('文件格式不正确，请选择图片文件');
                                        return false;
                                    }
			
									//调用该对象的方法 读取文件
									reader.readAsDataURL(file);
			
									reader.onload  = e =>{
                                        let strPath = reader.result;
                                        this.setState(
                                            {
                                                savePath: strPath
                                            },
                                            () => {
                                                this.props.onChange(strPath);
                                            }
                                        );
									}
								}}
								onChange={e=>{
									// console.log(e)
								}}
							>
								<Button style={{marginLeft:10}} type="primary">上传</Button>
							</Upload> :
                            <Popover
                                placement="bottomRight"
                                onVisibleChange={this.showFileList}
                                content={
                                    <div>
                                        <Row style={{marginBottom: 8}}>
                                            <Col span={24}>文件类型</Col> 
                                        </Row>
                                        <Row style={{marginBottom: 8}}>
                                            <Col span={24}>
                                                <RadioGroup
                                                    defaultValue="dashboard"
                                                    onChange={e => {
                                                        this.setState({
                                                            fileType : e.target.value
                                                        })
                                                        this.changeFileType(e.target.value);
                                                    }}
                                                    >
                                                    <Radio value="dashboard">仪表盘</Radio>
                                                    <Radio value="portal">数据门户</Radio>
                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                        <Spin tip="Loading" spinning={this.state.spin}>
                                            <div
                                                style={{
                                                    width: 215,
                                                    height: 300,
                                                    overflow: "auto"
                                                }}
                                                className="xfilesrc-popup"
                                            >
                                                <Tree
                                                    style={{display : this.state.fileType === "dashboard" ? "block" : "none"}}
                                                    onSelect={(key,e)=>{
                                                        if (!key[0]) return false;
                                                        let { fileGuid, name } = e.node.props.dataRef;
                                                        let result = "./dashboard_2.7.html?workspaceId="+window.dashboardMode.workspaceId+"&path="+fileGuid
                                                        this.setState(
                                                            {
                                                                savePath: result
                                                            },
                                                            () => {
                                                                this.props.onChange(result);
                                                            }
                                                        );
                                                    }}
                                                    loadData={this.onLoadData}
                                                >
                                                    {this.renderTreeNodes(this.state.dashboardData)}
                                                </Tree>
                                                <Tree
                                                    style={{display : this.state.fileType === "portal" ? "block" : "none"}}
                                                    onSelect={(key,e)=>{
                                                        if (!key[0]) return false;
                                                        let { fileGuid, name } = e.node.props.dataRef;
                                                        let result = "./portal_2.7.html?workspaceId="+window.dashboardMode.workspaceId+"&path="+fileGuid+"#/runner" 
                                                        this.setState(
                                                            {
                                                                savePath: result
                                                            },
                                                            () => {
                                                                this.props.onChange(result);
                                                            }
                                                        );
                                                    }}
                                                    loadData={this.onLoadData}
                                                >
                                                    {this.renderTreeNodes(this.state.portalData)}
                                                </Tree>
                                            </div>
                                        </Spin>
                                    </div>
                                }
                                trigger="click"
                            >
                                <Button
                                    type="primary"
                                    style={{ float: "right", padding: "0px 6px" }}
                                >
                                    浏览
                                    <Icon
                                        type={showFileList ? "down" : "right"}
                                        style={{ marginLeft: "4px" }}
                                    />
                                </Button>
                            </Popover>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

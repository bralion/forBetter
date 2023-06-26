/**
 * 组件-仪表盘编辑器
 * author:twy
 */
import React, { useState, useEffect, useRef } from "react";
import classnames from 'classnames';
import $ from 'jquery';

/**
 * 2.7.1版本仪表盘
 * @param {Object} props 
 * @param {String} props.tabId 页签ID，可用于子父窗口通信标识
 * @param {String} props.workspaceId 工作区ID
 * @param {String} props.type 类型:新增 2-编辑 1-预览 3-快照 0|--查看
 * @param {String} props.id 仪表盘ID，除新增外其他类型必须
 * @param {String} props.shareId 共享ID
 * @param {String} props.datasetId 默认选中的数据集ID
 * @param {String} props.className 额外的className
 */
const DashboardEditor = props => {
    let { tabId, workspaceId, type, id, className, datasetId,shareId } = props;
    let params = {
        tabId,
        workspaceId,
        shareId,
        type,
        datasetId,
        path: id
    };
    let src = './dashboard_2.7.html';
    let paramStr = '';

    for (let key in params) {
        let value = params[key];
        if (value !== void (0)) {
            paramStr += ['&', key, '=', value].join('');
        }
    }

    // url参数拼接
    if (paramStr !== '') {
        src += paramStr.replace(/^&/, '?');
    }

    return (
        <div className={classnames([className, "dashboard-editor-2_7"])}>
            <iframe src={src}></iframe>
        </div >
    );
}

export default DashboardEditor;

import React, { Component } from 'react';
import Editor from 'wangeditor'
class BaseRichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
            html: ''
        }
    }

    componentDidMount() {
        const { defaultValue = '', value, disabled, itemEname, form } = this.props
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new Editor(elemMenu, elemBody)
        this.setState({ editor })
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.config.onchange = (value) => {
            this.setState({ html: value })
            let temp = {}
            temp[itemEname] = value
            form && form.setFieldsValue(temp);
            const { onChange, onFormItemChange } = this.props
            if (onChange) {
                onChange(value)
            }
            if (onFormItemChange) {
                const { kId = '', title = '' } = this.props
                onFormItemChange({ kId, value: { [title]: value } })
            }
        }
        editor.config.uploadVideoAccept = ['mp4', 'webm', 'ogg']
        editor.config.placeholder = this.props.placeholder ? this.props.placeholder : '';
        editor.config.showLinkImg = false;
        editor.config.showLinkVideo = false;
        editor.config.uploadImgMaxLength = 5;
        editor.config.uploadVideoMaxSize = 20 * 1024 // 20m
        editor.config.uploadImgServer = '/fileagent/api/v1/file/upload'
        editor.config.uploadVideoServer = '/fileagent/api/v1/file/upload'
        editor.config.uploadImgParams = {
            type: 'img'
        }
        editor.config.uploadVideoParams = {
            type: 'video'
        }
        editor.config.uploadVideoHooks = {
            customInsert: function (insertVideoFn, result) {
                // result 即服务端返回的接口
                // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
                result.data[0] && insertVideoFn(result.data[0].url)
            },
            fail: function (xhr, editor, resData) {
                console.log('fail', resData)
            }
        }
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            let formData = new FormData();
            for (let i = 0; i < resultFiles.length; i++) {
                formData.append('file', resultFiles[i]);
            }
            formData.append('type', 'img');
            fetch(editor.config.uploadImgServer, { method: 'POST', body: formData }).then((res) => {
                if (res.status === 200) {
                    res.json().then(data => {
                        data.data.length && data.data.forEach(item => {
                            insertImgFn(item.url);
                        })
                    })
                }
            });
        }
        editor.config.uploadImgHooks = {
            // 上传图片之前
            before: function (xhr) {
                console.log(xhr);

            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function (xhr, editor, resData) {
                console.log('fail', resData)
            }

        }
        editor.config.uploadFileName = 'file'
        editor.config.uploadVideoName = 'file'
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            // 'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            // 'quote',  // 引用
            // 'emoticon',  // 表情
            'image',  // 插入图片
            // 'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.config.uploadImgShowBase64 = true
        editor.config.zIndex = 1
        editor.create()
        editor.txt.html(defaultValue.length > 0 ? defaultValue : value);
        if (disabled) {
            // console.log(editorRef.current.editor.disable,'editorRef.current.editor')
            editor.disable()
        }
    }

    render() {
        // const { style } = this.props
        return (
            <div className="shop">
                <div className="text-area" >
                    <div ref="editorElemMenu"
                        style={{ backgroundColor: '#f1f1f1', border: '1px solid #ccc' }}
                        className="editorElem-menu"
                    >
                    </div>
                    <div
                        style={{
                            padding: '0 10px',
                            overflowY: 'scroll',
                            height: 350,
                            border: '1px solid #ccc',
                            borderTop: 'none'
                        }}
                        ref="editorElemBody" className="editorElem-body"
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default BaseRichEditor;


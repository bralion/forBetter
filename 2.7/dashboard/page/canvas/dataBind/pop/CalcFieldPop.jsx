/**
 * 计算字段配置框
 * create time: 2018/9/21
 */
import React, { Component } from 'react';
import { Input, Row, Col, Button, Select, message, Icon } from 'antd';
import { connect } from 'react-redux';
import databindM from 'dashboard_2_7/dashboard/modules/business/databind';
import Config from 'dashboard_2_7/dashboard/modules/common/Config';
import Util from 'dashboard_2_7/dashboard/modules/common/Util';
import classnames from 'classnames';
import _ from 'underscore';

import CodeMirror from 'dashboard_2_7/dashboard/page/panels/panelComponents/codeMirror';
import codeMirrorInstance from 'codemirror';

import 'dashboard_2_7/dashboard/modules/business/show-hint';
import 'codemirror/addon/hint/show-hint.css';

//引入自定义mode、hint
import 'dashboard_2_7/dashboard/modules/business/codeModeFormula';

import esprima from 'dashboard_2_7/dashboard/modules/common/esprima';

const config = new Config();
const util = new Util();
const Option = Select.Option;
//函数列表
const CALC_FN = config.DATA_BIND.CALC_FN || [];
//支持的运算符
const OPERATOR = ['+', '-', '*', '/', '%'];
//支持的比较运算符
const COMPARE_OPERATOR = ['==', '!=', '>', '<', '>=', '<='];
//默认props
const DEFAULT_PROPS = {
    fields: []
};
//将函数列表扁平化，方便取用
const CALC_FN_OBJ = {};

CALC_FN.forEach(item => {
    if (item.children) {
        item.children.forEach(v => {
            CALC_FN_OBJ[v.name] = v;
        });
    }
});

/**
 * 判断字段类型
 * @param {String} type 原始类型
 */
function getFieldType(type) {
    return util.getRelFieldType(type);
}

class CalcFieldPop extends Component {
    constructor(props) {
        super();
        let { field } = props;

        this.state = {
            //计算字段ID
            fieldId: '',

            //计算字段名称
            fieldName: '',

            //公式字符串
            formulaStr: '',

            //字段搜索关键字
            fieldKeyword: '',
            //字段组名
            fieldGroup: '',

            //函数搜索关键字
            fnKeyword: '',
            //函数组名
            fnGroup: '',

            //点击的函数信息
            clickFn: null
        };

        if (field) {
            this.state.fieldId = field.id;
            this.state.fieldName = field.name;
            this.state.formulaStr = field.formulaStr;
        }

        //代码编辑器实例
        this.code = null;
    }

    /**
     * 将字段加引号，不然词法解析会出错
     * [].[] 替换为 “[].[]”
     * @param {*} str 用户输入的公式字符串
     * @param {*} contrast
     */
    _replaceFiledName(str, contrast) {
        return str.replace(/(\[.+?]\.\[.+?])/g, '"$1"');
    }

    /**
     * 参数验证，并获取词法节点返回值类型
     * @param {Object} item 词法节点
     * @param {Object} contrast 公式中字段的信息集合
     */
    _getType(item, contrast) {
        let { callback, value } = item;

        if (!callback) {
            // 字段
            if (typeof value === 'string' && /^\[.+]\.\[.+]$/.test(value)) {
                // 找不到插入字段的信息，无法得到类型
                if (!contrast[value]) {
                    return;
                }
                let field = contrast[value];
                let type = getFieldType(field.type);
                return type;
            }
            return typeof value;
        }

        if (typeof callback === 'string' && CALC_FN_OBJ[callback]) {
            let fn = CALC_FN_OBJ[callback];
            let result = fn.ruleValid.call(fn, value || []);
            if (result.result === false) {
                message.error(result.message);
                return false;
            } else {
                return result.dataType;
            }
        }

        if (OPERATOR.indexOf(callback) > -1) {
            // if(_.isArray(value) && value.length > 1){
            //     let [v1,v2] = value;
            //     if(v1.dataType !== 'number' || v2.dataType !== 'number'){
            //         message.error('公式错误，只有数字类型才能参与运算。');
            //         return false;
            //     }
            // }
            return 'number';
        }

        if (COMPARE_OPERATOR.indexOf(callback) > -1) {
            return 'boolean';
        }
    }

    /**
     * 将词法解析的结果进行转换，item结构为：
     * {callback,value,returnType}
     * item.callback     {String}                        函数名/运算符/比较符
     * item.value        {Array|String|Number|Boolean}   值/参数
     * item.dataType     {String}                        该item返回的数据类型 string|number|boolean
     * @param {Object} ast 词法解析结果
     * @param {Object} contrast 公式中字段的信息集合
     */
    _translate(ast, contrast) {
        const type = ast.type;
        if (type === 'ExpressionStatement') {
            let item = this._translate(ast.expression, contrast);
            if (item === false) {
                return false;
            }
            item.dataType = this._getType(item, contrast);
            return item.dataType === false ? item.dataType : item;
        } else if (type === 'BinaryExpression') {
            let left = this._translate(ast.left, contrast);
            let right = this._translate(ast.right, contrast);
            if (left === false || right === false) {
                return false;
            }
            let item = {
                callback: ast.operator,
                value: [left, right]
            };
            item.dataType = this._getType(item, contrast);
            return item.dataType === false ? false : item;
        } else if (type === 'UnaryExpression') {
            let item = {
                callback: ast.operator,
                value: this._translate(ast.argument)
            };
            if (item.value === false) {
                return false;
            }
            item.dataType = this._getType(item, contrast);
            return item.dataType === false ? false : item;
        } else if (type === 'CallExpression') {
            let item = {
                callback: ast.callee.name,
                value: ast.arguments.map(item => {
                    let argumentItem = this._translate(item, contrast);
                    if (argumentItem === false) {
                        return false;
                    }
                    return argumentItem;
                })
            };
            let hasFalse = item.value.find(v => v === false);
            if (!_.isUndefined(hasFalse)) {
                return false;
            }
            item.dataType = this._getType(item, contrast);
            return item.dataType === false ? false : item;
        } else if (type === 'Literal') {
            let item = {
                value: ast.value
            };
            item.dataType = this._getType(item, contrast);
            return item.dataType === false ? false : item;
        }
    }

    /**
     * 并对数据词法解析，获取公式返回值，并对公式合法性,函数参数个数、函数参数类型进行校验
     * @param {Object} config 用户配置结果对象
     * @return {Boolean|Object} 若返回false，表示校验不通过
     */
    translateConfig(config) {
        let dataType;
        let ast;
        let { formulaStr, contrast } = config;

        try {
            formulaStr = this._replaceFiledName(formulaStr, contrast);
            formulaStr = formulaStr
                .replace(/([^><])=/g, '$1==')
                .replace(/<>/g, '!=');
            ast = esprima.parse(formulaStr);
            //对词法结果二次转换，并获取各个item的数据类型和函数参数校验
            ast = this._translate(ast.body[0], contrast);
        } catch (error) {
            console.log('error', error);
            message.error('表达式错误或不完整！');
            return false;
        }

        if (ast === false) {
            return false;
        }

        dataType = ast.dataType;

        if (!dataType) {
            message.error('计算字段返回类型错误，请检查和修改表达式！');
            return false;
        }

        if (dataType === 'object') {
            message.error('表达式结果不能为对象，请检查和修改表达式！');
            return false;
        }

        if (dataType === 'boolean') {
            message.error('表达式结果不能为布尔类型，请检查和修改表达式！');
            return false;
        }

        return Object.assign(config, { type: dataType });
    }

    /**
     * 获取配置结果
     * @return {Object} result
     * result.id          {String} 计算字段ID
     * result.calcName    {String} 计算字段名称
     * result.formulaStr  {String} 计算字段对应的公式
     * result.contrast    {Object} 计算字段用到的字段信息集合对象
     */
    getConfig() {
        let { fieldId, fieldName, formulaStr } = this.state;
        let contrast = {};
        let config;

        fieldName = fieldName || '';

        if (!fieldName.replace(/[\s]/g, '')) {
            message.error('字段名称不能为空。');
            return false;
        }

        if (!formulaStr.replace(/[\s\n]/g, '')) {
            message.error('请填写字段计算公式。');
            return false;
        }

        let reg = /\[.+?\]\.\[.+?\]/g;
        let match = formulaStr.match(reg);
        if (match && match.length) {
            let { fields } = this.props;
            match.forEach(v => {
                let arr = v.split('].[');
                let groupName = arr[0].substr(1);
                let fieldName = arr[1].substr(0, arr[1].length - 1);
                let group = fields.filter(v => v.name === groupName);
                let columns = group.reduce((arr, item) => {
                    return arr.concat(item.columns);
                }, []);

                if (group && columns) {
                    let field = columns.find(v => v.name === fieldName);
                    if (field) {
                        let id = [field.__group.id, field.id].join('.');
                        contrast[v] = field;
                    }
                }
            });
        }

        config = {
            id: fieldId,
            calcName: fieldName,
            formulaStr: formulaStr,
            contrast
        };

        return this.translateConfig(config);
    }

    /**
     * 改变组类型
     * @param {String} type 要改变的类型 field-字段 fn-函数
     * @param {String} group 要改变成的组的值
     */
    changeGroup(type, group) {
        this.setState({
            [`${type}Group`]: group
        });
    }

    /**
     * 获取当前函数列表
     * @param {Array} list 全部函数列表
     * @param {String} group 分组类型
     * @param {String} keyword 关键字
     */
    _getFnList(list, group, keyword) {
        let fnList = [];
        if (group) {
            let current = list.filter(v => v.value === group)[0];
            current && current.children && (fnList = current.children);
        } else {
            list.forEach(v => {
                v.children && (fnList = fnList.concat(v.children));
            });
        }

        keyword = keyword.toLowerCase();

        fnList = fnList.filter(v => {
            let name = v.name.toLowerCase();
            return name.indexOf(keyword) > -1;
        });

        return fnList;
    }

    /**
     * 获取当前字段列表
     * @param {Array} list 全部字段列表
     * @param {String} group 分组类型
     * @param {String} keyword 关键字
     */
    _getFieldList(list, group, keyword) {
        let fieldList = [];
        if (group) {
            let current = list.filter(v => v.id === group)[0];
            current && current.columns && (fieldList = current.columns);
        } else {
            list.forEach(v => {
                v.columns && (fieldList = fieldList.concat(v.columns));
            });
        }

        keyword = keyword.toLowerCase();

        fieldList = fieldList.filter(v => {
            let name = v.name.toLowerCase();
            return name.indexOf(keyword) > -1;
        });

        return fieldList;
    }

    /**
     * 向编辑器插入内容
     * @param {String} type 类型 fn-函数 field-字段
     * @param {Object} item 信息对象
     */
    insert(type, item) {
        let codeMirror = this.code.codeMirror;
        let str;
        if (type === 'fn') {
            let obj = codeMirror.getCursor();
            str = item.name + '()';
            //插入内容
            codeMirror.replaceSelection(str);
            //光标前移至括号内
            codeMirror.setCursor(obj.line, obj.ch + str.length - 1);
            //获取焦点
            codeMirror.focus();
        } else if (type == 'field') {
            str = '[' + item.__group.name + '].[' + item.name + ']';
            //插入内容
            codeMirror.replaceSelection(str);
            //获取焦点
            codeMirror.focus();
        }
    }

    render() {
        const props = Object.assign({}, DEFAULT_PROPS, this.props);
        let { fields } = props;
        let {
            fieldName,
            formulaStr,
            fieldKeyword,
            fieldGroup,
            fnKeyword,
            fnGroup,
            clickFn
        } = this.state;
        let fnList = this._getFnList(CALC_FN, fnGroup, fnKeyword);
        let fieldList = this._getFieldList(fields, fieldGroup, fieldKeyword);

        return (
            <div className="databind-calc-pop">
                <div className="databind-calc-header flex-align-center">
                    <span
                        style={{
                            width: '68px',
                            display: 'inline-block'
                        }}
                    >
                        字段名称
                    </span>
                    <Input
                        value={fieldName}
                        placeholder="请输入计算字段名称"
                        onChange={e => {
                            this.setState({
                                fieldName: e.target.value
                            });
                        }}
                    />
                </div>
                <div className="databind-calc-formula">
                    <CodeMirror
                        style={{ width: '100%' }}
                        codeMirrorInstance={codeMirrorInstance}
                        ref={code => (window.bbb = this.code = code)}
                        onChange={(val, changeObj) => {
                            if (val === formulaStr) {
                                return;
                            }

                            //光标前字符是字母时候，进行输入函数提示
                            if (/[a-zA-Z]$/.test(changeObj.text[0])) {
                                this.code.codeMirror.showHint({
                                    completeSingle: false
                                });
                            }

                            this.setState({
                                formulaStr: val
                            });
                        }}
                        value={formulaStr}
                        options={{
                            mode: 'formula',
                            lineNumbers: false, //行号
                            lineWrapping: true //自动换行
                        }}
                    />
                </div>
                <div className="databind-calc-main">
                    <div className="databind-calc-item databind-calc-field">
                        <div className="databind-calc-item__title">字段</div>
                        <Select
                            value={fieldGroup}
                            className="databind-calc-item__group"
                            onChange={value => {
                                this.changeGroup('field', value);
                            }}
                        >
                            <Option value="">全部</Option>
                            {fields.map(v => (
                                <Option key={v.id} value={v.id}>
                                    {v.name}
                                </Option>
                            ))}
                        </Select>
                        <div className="databind-calc-item__list">
                            <Input
                                prefix={
                                    <Icon
                                        type="search"
                                        style={{
                                            color: '#9c9c9c',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            left: '-4px',
                                            position: 'relative'
                                        }}
                                    />
                                }
                                placeholder="输入搜索关键字"
                                value={fieldKeyword}
                                onChange={e => {
                                    this.setState({
                                        fieldKeyword: e.target.value
                                    });
                                }}
                                style={{ marginBottom: '5px' }}
                            />
                            <ul>
                                {fieldList.map((v, i) => (
                                    <li
                                        className="text-ellipsis"
                                        style={{
                                            position: 'relative'
                                        }}
                                        key={i}
                                        onClick={() => {}}
                                    >
                                        <i
                                            className={
                                                'databind-icon-' +
                                                getFieldType(v.type)
                                            }
                                        />
                                        {v.name}
                                        <i
                                            className="databind-calc-insert"
                                            onClick={() => {
                                                this.insert('field', v);
                                            }}
                                        >
                                            插入
                                        </i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="databind-calc-item databind-calc-fn">
                        <div className="databind-calc-item__title">函数</div>
                        <Select
                            className="databind-calc-item__group"
                            value={fnGroup}
                            onChange={value => {
                                this.changeGroup('fn', value);
                                this.setState(
                                    {
                                        clickFn: null
                                    },
                                    () => {
                                        // 重设滚动高度到顶部位置
                                        this.refs.fnList.scrollTop = 0;
                                    }
                                );
                            }}
                        >
                            <Option value="">全部</Option>
                            {CALC_FN.map(v => (
                                <Option key={v.value} value={v.value}>
                                    {v.name}
                                </Option>
                            ))}
                        </Select>
                        <div className="databind-calc-item__list">
                            <Input
                                prefix={
                                    <Icon
                                        type="search"
                                        style={{
                                            color: '#9c9c9c',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            left: '-4px',
                                            position: 'relative'
                                        }}
                                    />
                                }
                                placeholder="输入搜索关键字"
                                value={fnKeyword}
                                onChange={e => {
                                    this.setState({
                                        fnKeyword: e.target.value
                                    });
                                }}
                                style={{ marginBottom: '5px' }}
                            />
                            <ul ref="fnList">
                                {fnList.map(v => (
                                    <li
                                        className={
                                            'text-ellipsis ' +
                                            (clickFn && clickFn.name === v.name
                                                ? 'selected'
                                                : '')
                                        }
                                        style={{
                                            position: 'relative'
                                        }}
                                        key={v.name}
                                        onClick={() => {
                                            this.setState({
                                                clickFn: v
                                            });
                                        }}
                                    >
                                        {v.name}
                                        <i
                                            className="databind-calc-insert"
                                            onClick={() => {
                                                this.insert('fn', v);
                                            }}
                                        >
                                            插入
                                        </i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="databind-calc-item databind-calc-explain">
                        <div className="databind-calc-item__title">
                            函数说明
                        </div>
                        <div className="databind-calc-explain__panel">
                            {clickFn ? (
                                <div>
                                    <Row className="databind-calc-explain__item">
                                        <div className="databind-calc-explain__title">
                                            用法：
                                        </div>
                                        <div className="databind-calc-explain__content">
                                            {clickFn.usage}
                                        </div>
                                    </Row>
                                    <Row className="databind-calc-explain__item">
                                        <div className="databind-calc-explain__title">
                                            说明：
                                        </div>
                                        <div className="databind-calc-explain__content">
                                            {_.isArray(clickFn.explain)
                                                ? clickFn.explain.map(v => (
                                                      <div key={v}>{v}</div>
                                                  ))
                                                : clickFn.explain}
                                        </div>
                                    </Row>
                                    <Row className="databind-calc-explain__item">
                                        <div className="databind-calc-explain__title">
                                            示例：
                                        </div>
                                        <div className="databind-calc-explain__content">
                                            {clickFn.example &&
                                                clickFn.example.map(v => (
                                                    <div key={v}>{v}</div>
                                                ))}
                                        </div>
                                    </Row>
                                </div>
                            ) : (
                                <div className="noData">
                                    <i />
                                    点击函数显示说明
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="ant-modal-footer"
                    style={{
                        border: 0,
                        marginTop: '10px',
                        marginBottom: '-5px'
                    }}
                >
                    <div>
                        <Button
                            onClick={e => {
                                this.props.closePop();
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            onClick={e => {
                                let config = this.getConfig();
                                if (config !== false) {
                                    this.props.onSave(config);
                                }
                            }}
                            type="primary"
                        >
                            确定
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        fields: state.databind.fields
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CalcFieldPop);

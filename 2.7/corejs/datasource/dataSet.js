/**
 * 数据集数据源
 */
import _ from "underscore";
import _Config from "dashboard_2_7/dashboard/modules/common/Config";
import Util from "dashboard_2_7/dashboard/modules/common/Util";
import databindM, { commonValid } from "dashboard_2_7/dashboard/modules/business/databind";

const util = new Util();
const Config = new _Config();
const ORDER_TYPE = {
    up: "ASC", 
    down: "DES",
    none: 'NONE'
};

/**
 * 生成公式字符串拼接，时需要对value值做转换
 * 1、为字符串类型值添加双引号
 * 2、为参数做转换
 * @param {Any} 值
 */
const changeFormulaValue = value => {
    if (_.isArray(value)) {
        return value.map(v => changeFormulaValue(v));
    }

    if (typeof value === "string") {
        //如果是参数，${name} 需要替换为 [param:name]
        if (/^\${.+}$/.test(value)) {
            return value.replace(/^\${(.+)}$/, "[param:$1]");
        } else if (!/^".*"$/.test(value) && !/\[param:.+\]/.test(value)) {
            return '"' + value.replace(/"/, '\\"') + '"';
        }
    }
    return value;
};

/**
 * 构建单条条件公式
 * @param {String} fieldId 字段ID (groupId+fieldId)
 * @param {String} operator 运算符
 * @param {Any} value
 */
const buildSingleFormula = (fieldId, operator, value, fieldType) => {
    let str;
    fieldType = util.getRelFieldType(fieldType);

    value = changeFormulaValue(value);

    switch (operator) {
        case "IN":
            str = "IN([" + fieldId + "];" + value.join(";") + ")";
            break;
        case "NOT_IN":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "IN", value, fieldType) +
                ")";
            break;
        case "EQUAL":
            // str = "[" + fieldId + "]=" + value;
            str = "IN([" + fieldId + "];" + value + ")";
            break;
        case "NOT_EQUAL":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "EQUAL", value, fieldType) +
                ")";
            break;
        case "BEGINS_WITH":
            str = "BEGINSWITH([" + fieldId + "];" + value + ")";
            break;
        case "BEGIN_NOT":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "BEGINS_WITH", value, fieldType) +
                ")";
            break;
        case "ENDS_WITH":
            str = "ENDSWITH([" + fieldId + "];" + value + ")";
            break;
        case "END_NOT":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "ENDS_WITH", value, fieldType) +
                ")";
            break;
        case "LIKE":
            str = "CONTAINS([" + fieldId + "];" + value + ")";
            break;
            break;
        case "DOES_NOT_LIKE":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "LIKE", value, fieldType) +
                ")";
            break;
        case "IS_NULL":
            str = "ISNA([" + fieldId + "])";
            break;
        case "IS_NOT_NULL":
            str =
                "NOT(" +
                buildSingleFormula(fieldId, "IS_NULL", null, fieldType) +
                ")";
            break;
        case "GREATER_THAN":
            str = "[" + fieldId + "]>" + value;
            break;
        case "LESS_THAN":
            str = "[" + fieldId + "]<" + value;
            break;
        case "GREATER_OR_EQUAL":
            str = "[" + fieldId + "]>=" + value;
            break;
        case "LESS_OR_EQUAL":
            str = "[" + fieldId + "]<=" + value;
            break;
        case "RANGE":
            str =
                "AND(" +
                buildSingleFormula(
                    fieldId,
                    "GREATER_OR_EQUAL",
                    value[0],
                    fieldType
                ) +
                ";" +
                buildSingleFormula(
                    fieldId,
                    "LESS_OR_EQUAL",
                    value[1],
                    fieldType
                ) +
                ")";
            break;
    }
    return str;
};

class DataSet {
    constructor() {
        this.type = "mql"; //类型
        this.url = "/xdatainsight/cda/api/query";
        this.data = {
            columns: [],
            conditions: [],
            orders: [],
            domainName: "tyty.xmi",
            modelId: "MODEL_1",
            //是否禁用去重
            disableDistinct: true
        };
    }

    /**
     * 构建条件公式
     * @param {Object} config 数据集绑定配置对象
     */
    buildFormula(config, calcColumnsObj, drillFormula) {
        let { filterConfig } = config;
        let condArr = [];
        let str = "";

        if (!filterConfig.fields) {
            return;
        }

        filterConfig.fields.forEach(item => {
            let { config, field, group } = item;
            let filterType = config.filterType;
            let fieldId = [group.id, field.id].join(".");
            let fieldtype = field.type;

            if (field.calc === true) {
                this._cacheCalcColumn(calcColumnsObj, field);
                fieldId = ["calc_field", field.id].join(".");
            } else {
                fieldId = [group.id, field.id].join(".");
            }

            //0-基本筛选
            if (filterType === 0 && config.checked && config.checked.length) {
                condArr.push(
                    buildSingleFormula(
                        fieldId,
                        config.exclude ? "NOT_IN" : "IN",
                        config.checked,
                        fieldtype
                    )
                );
            }
            //1-条件筛选
            if (
                filterType === 1 &&
                config.condition &&
                config.condition.children &&
                config.condition.children.length
            ) {
                let _arr = config.condition.children.map(cond =>
                    buildSingleFormula(
                        fieldId,
                        cond.operator,
                        cond.value,
                        fieldtype
                    )
                );
                condArr.push(
                    config.condition.relation + "(" + _arr.join(";") + ")"
                );
            }
        });
        //如果存在下钻条件参数，和筛选条件整合到一起共同构成查询条件
        if (drillFormula && drillFormula.length) {
            condArr = condArr.concat(drillFormula);
        }
        if (condArr.length === 1) {
            str = condArr[0];
        } else if (condArr.length > 1) {
            str = ["AND", "(", condArr.join(";"), ")"].join("");
        }

        return str;
    }

    //构造参数
    createParam() {
        let value,
            key,
            param = [];

        for (key in this.param) {
            value = this.param[key];
            if (Array.isArray(value)) {
                if(value.length>0){
                    value.forEach(val => param.push(`${key}=${val}`));
                }else{
                    param.push(`${key}=`)
                }
            } else {
                param.push(`${key}=${value}`);
            }
        }

        return param.join("&");
    }

    /**
     * 判断字段数量是否符合要求
     */
    ifConfirm() {
        let _components = databindM.getDatasetComponents();
        const { cellsConfig } = this.config;
        let type = this.modelType;
        let cells = _components.find(e => e.type == type).cells;
        let lenArr = cells.map(
            item => cellsConfig[item.valueKey].fields.length
        );
        let aa = cells.map((item, idx) =>
            item.valid.call(item, lenArr[idx], lenArr, commonValid)
        );

        return aa.every(e => e.result);
    }

    //将该计算字段记录到缓存对象中
    _cacheCalcColumn(calcColumnsObj, field) {
        let { id } = field;
        let calcField = Dashboard.dataBind.findFieldById(id);

        //如果字段中存的公式和模块中存储的公式不一致，以模块中为准
        if (calcField && calcField.formulaStr !== formulaStr) {
            Object.assign(field, {
                name: calcField.calcName,
                formulaStr: calcField.formulaStr,
                contrast: calcField.contrast,
                type: calcField.type
            });
        }

        let { formulaStr, contrast } = field;

        formulaStr = databindM._replaceNameToId(formulaStr, contrast);
        formulaStr = databindM._replaceToSemicolon(formulaStr);

        //存在于计算字段分组或者日期类计算字段，缓存到calcColumnsObj中
        if (
            Dashboard.dataBind.findFieldById(field.id) ||
            /.+__.+/.test(field.id)
        ) {
            //将该计算字段记录到缓存对象中
            calcColumnsObj[field.id] = {
                id: field.id,
                name: field.name,
                formula: formulaStr
            };
        }
    }
    /**
     * 构建下钻条件公式
     */
    buildDrillFormula(fields, drillData) {
        let { nextIdx, value } = drillData;
        let condArr = [];
        for (let i = 0; i < nextIdx; i++) {
            let field = fields[i];
            let fieldId = [field.group.id, field.field.id].join(".");
            if (field.field.calc === true) {
                fieldId = ["calc_field", field.field.id].join(".");
            }
            if (!_.isUndefined(value[i])) {
                condArr.push(buildSingleFormula(fieldId, "EQUAL", value[i]));
            }
        }
        return condArr;
    }

    /**
     * 构建多cells下钻条件公式
     */
    buildGroupDrillFormula(fields, value, drillFormula) {
        //由于地图只有单条 暂只支持单条
        let field = fields[0];
        let fieldId = [field.group.id, field.field.id].join(".");
        if (field.field.calc === true) {
            fieldId = ["calc_field", field.field.id].join(".");
        }
        if (!_.isUndefined(value)) {
            drillFormula.push(buildSingleFormula(fieldId, "EQUAL", value));
        }
    }

    /**
     * 构建数据查询参数对象
     */
    buildParams() {
        //深度拷贝datasetSetting
        let config = JSON.parse(JSON.stringify(this.config));
        let _components = databindM.getDatasetComponents();
        //如果是下钻查询，将存在下钻信息对象
        let drillData = this.drillData || {};
        //datasetSetting中详细配置
        const { cellsConfig, dataset, filterConfig, limit, modelId } = config;
        //从所有组件配置中获取当前类型组件字段分组配置信息
        let cells = _components.find(e => e.type == this.modelType).cells;
        let groupDrill = _components.find(e => e.type == this.modelType).groupDrill;
        let cellsConfigKeys = Object.keys(cellsConfig) || [];
        //要查询字段集合
        let defaultArr = [];
        //下钻条件公式
        let drillFormula;
        //查询字段index计数器
        let ind;
        //缓存分组类型对应查询字段columns中index
        let cellToInd = {};
        //条件公式，用于筛选条件构建
        let formula;
        //用到的计算字段缓存对象
        let calcColumnsObj = {};
        //写入参数modelId
        this.data.modelId = modelId;
        //写入参数domainName
        // this.data.domainName = dataset.name;
        this.data.domainName = dataset.id;
        //写入计算字段
        this.data.calcColumns = [];
        //所有字段集合
        let allfields = [];
        cells.forEach(e => {
            let valueKey = e.valueKey;
            let fields = cellsConfig[valueKey].fields;
            allfields = allfields.concat(fields);
        });
        
        this.isDrill && (!groupDrill) &&
        cells.forEach(e => {
            let valueKey = e.valueKey;
            let fields = cellsConfig[valueKey].fields;
            //如果该类型字段组为下钻类型，取下钻信息中nextIdx或第一个字段。
            if (e.dirll) {
                let idx = 0;
                if (drillData && valueKey === drillData.cellKey) {
                    idx = drillData.nextIdx;
                    //构建下钻条件公式
                    drillFormula = this.buildDrillFormula(
                        fields,
                        drillData
                    );
                }
                cellsConfig[valueKey].fields = fields.filter(
                    (e, i) => i === idx
                );
            }
        });

        if (groupDrill) {
            let groupDrillIdx = 0;
            if (!drillData && !drillData.nextIdx) {
                drillData.nextIdx = 0;
            }
            drillFormula = [];
            cells.forEach(e => {
                if (e.groupDrill) {
                    if (
                        drillData.nextIdx > groupDrillIdx &&
                        cellsConfig[e.valueKey].fields.length >
                            0
                    ) {
                        this.buildGroupDrillFormula(
                            cellsConfig[e.valueKey].fields,
                            drillData.value[groupDrillIdx],
                            drillFormula
                        );
                    }
                    if (drillData.nextIdx !== groupDrillIdx) {
                        cellsConfig[e.valueKey].fields = [];
                    }

                    groupDrillIdx++;
                }
            });
        }

        //合并数组 生成对应下标
        cellsConfigKeys.forEach(e => {
            cellToInd[e] = [];
            defaultArr = defaultArr.concat(cellsConfig[e].fields);
            cellsConfig[e].fields.map((ee, ii) => {
                ind = ind === undefined ? 0 : ind + 1;
                cellToInd[e].push(ind);
            });
        });

        //将分组对应查询字段下表缓存，写入config中
        this.config.cellToInd = cellToInd;

        //构造查询字段，写入参数columns和sort
        defaultArr.forEach(e => {
            //普通聚合
            e.field.selectedAggType = e.config.collect || "NONE";
            ["calcs", "__group"].forEach(item => {
                if (e.field[item]) {
                    delete e.field[item];
                }
            });
            //高级计算
            e.field.advancedCalc = !e.config.higsum
                ? "NONE"
                : e.config.higsum !== "nonee"
                ? e.config.higsum
                : "NONE";
            //同环比添加日期字段
            var dataField = defaultArr.find(ee => ee.field.type === "date");
            let _fieldsArr = [],
                fieldsArr = [];
            fieldsArr = defaultArr.filter(
                item =>
                    item.field.type === "date" &&
                    (item.config.collect === undefined ||
                        item.config.collect === "NONE")
            );
            var fieldsArrLen = fieldsArr.length || 0;
            if (
                /YearOnYear|RingRatio/.test(e.config.higsum) &&
                fieldsArrLen === 1
            ) {
                var dataFieldIds = fieldsArr[0].field.id.split("__");
                Object.assign(e.field, {
                    granularity: dataFieldIds[2].toUpperCase(), //日期字段的粒度，为大写的YEAR,QUARTER,MONTH,WEEK,DAY
                    sourceDateColumnId: dataFieldIds[1], //"LC_Business1cn_datetime",  //原始的日期字段ID
                    targetDateColumnId: dataFieldIds.join("__") //"Business1cn__LC_Business1cn_datetime__quarter" //经过变换的日期字段ID,如选择季度等
                });
            }
            //计算字段和普通字段需要区别处理
            if (e.field.calc === true) {
                let { formulaStr, type, name } = e.field;
                let singleConvergeFn = databindM.getSingleConvergeFn(
                    formulaStr
                );
                let fnMap = {
                    AVG: "AVERAGE",
                    COUNT: "COUNT",
                    COUNT_DISTINCT: "COUNT_DISTINCT",
                    MAX: "MAXIMUM",
                    MIN: "MINIMUM",
                    SUM: "SUM"
                };
                let selectedAggType;
                const TYPE_MAP = {
                    number: "Numeric",
                    string: "String",
                    date: "Date"
                };

                // this._cacheCalcColumn(calcColumnsObj, e.field);
                /**
                 * 计算字段包含一个聚合函数，取该聚合函数的名字，找到后台对应的聚合方式作为selectedAggType，不然接口拼接SQL查询会报错
                 * 如果一个计算字段包含多个聚合函数，selectedAggType传NONE，目前这种情况接口还没法处理
                 * ps:最新：去掉以上逻辑
                 */
                // if (singleConvergeFn && fnMap[singleConvergeFn]) {
                //     selectedAggType = fnMap[singleConvergeFn];
                // } else {
                    selectedAggType = e.field.selectedAggType || "NONE";
                // }

                this.data.columns.push({
                    id: e.field.id,
                    selectedAggType,
                    name,
                    orderAggType: ORDER_TYPE[e.config.sort] || 'NONE',
                    type: TYPE_MAP[type]
                });
            } else if (
                e.config.isDataGroup &&
                e.config.dataGroup &&
                e.config.dataGroup.model !== "none" &&
                (e.config.collect === "NONE" || !e.config.collect)
            ) {
                this.setDataGroupArr(e);
            } else {
                let column = {
                    ...e.field,
                    orderAggType: ORDER_TYPE[e.config.sort] || 'NONE'
                };
                this.data.columns.push(column);
            }
            // 排序规则放到每个查询字段属性【orderAggType】中，避免查询两个相同字段，排序规则不一样的问题
            // e.config.sort &&
            //     e.config.sort != "none" &&
            //     this.data.orders.push({
            //         column: e.field.id,
            //         category: e.field.category,
            //         orderType: { up: "ASC", down: "DESC" }[e.config.sort]
            //     });
        });
        allfields.forEach(e => {
            if (e.field.calc === true) {
                this._cacheCalcColumn(calcColumnsObj, e.field);
            }
        });
        //构造查询条件公式
        formula = this.buildFormula(config, calcColumnsObj, drillFormula);

        //如果存在条件公式，将条件公式写入参数查询条件
        if (formula) {
            this.data.conditions = [
                {
                    condition: formula,
                    combinationType: "AND"
                }
            ];
        } else {
            this.data.conditions = [];
        }

        //将用到的计算字段存入查询条件中
        for (let key in calcColumnsObj) {
            this.data.calcColumns.push(calcColumnsObj[key]);
        }

        return this.data;
    }
    //数据分组  数据处理
    setDataGroupArr(e) {
        var uuid = util.guid();
        var { group, field, config } = e;
        var { dataGroup } = config;
        var fielsAndId = group.id + "." + field.id;
        var fuToStr = {
            "<": "LESS_THAN",
            "<=": "LESS_OR_EQUAL",
            ">": "GREATER_THAN",
            ">=": "GREATER_OR_EQUAL"
        };
        var startToFu = {
            "<": "GREATER_THAN",
            "<=": "GREATER_OR_EQUAL",
            ">": "LESS_THAN",
            ">=": "LESS_OR_EQUAL"
        };
        //数据分组数组
        var fieldToArr = [], //数据分组格式统一处理
            perNum,
            value = 5, //数据分组段数
            perInd = 0,
            start,
            end,
            formuArr = [],
            endStr = ';"null"',
            formula = ""; //结尾拼接
        if (dataGroup.model === "auto") {
            value = dataGroup.value || value;
            perNum = (dataGroup.max - dataGroup.min) / value;
            perNum =
                value < 5 ? Math.ceil(perNum * 10) / 10 : Math.ceil(perNum);
            while (perInd < value) {
                start = dataGroup.min + perNum * perInd;
                end = start + perNum;
                fieldToArr.push({
                    name: start + "-" + end,
                    start: start,
                    startF: "<=",
                    endF: perInd === value - 1 ? "<=" : "<",
                    end: end
                });
                perInd++;
            }
        } else {
            fieldToArr = dataGroup.values;
            if (dataGroup.restGrop && dataGroup.restGrop.check) {
                endStr = `;"${dataGroup.restGrop.groupName}"`;
            }
        }
        fieldToArr.forEach(item => {
            var formuStr1 = "",
                formuStr2 = "";

            formuStr1 =
                item.start === "无限制"
                    ? ""
                    : buildSingleFormula(
                          fielsAndId,
                          startToFu[item.startF],
                          item.start
                      );
            formuStr2 =
                item.end === "无限制"
                    ? ""
                    : buildSingleFormula(
                          fielsAndId,
                          fuToStr[item.endF],
                          item.end
                      );
            if (formuStr1 && formuStr2) {
                formuArr.push(
                    `IF(AND(${formuStr1};${formuStr2});"${item.name}"`
                );
            } else {
                formuArr.push(`IF(${formuStr1 || formuStr2};"${item.name}"`);
            }
            endStr += ")";
        });
        formula = formuArr.join(";") + endStr;
        this.data.columns.push({
            id: uuid,
            selectedAggType: "NONE",
            name: config.cellName,
            orderAggType: ORDER_TYPE[e.config.sort] || 'NONE',
            type: "String"
        });
        this.data.calcColumns.push({
            id: uuid,
            name: config.cellName,
            formula: formula
        });
        // console.log(formula);
    }
    getFetchCfg() {
        const { limit } = this.config;
        let str = "";
        let data;
        if (limit.top && limit.top !== -1) {
            str = `?paginateQuery=true&pageSize=${limit.top}&pageStart=0`;
        }
        data = `query=${JSON.stringify(this.buildParams())}&type=${this.type}`;
        data = util.enCodeQueryString(data);
        return {
            method: "post",
            url: this.url + str + (str ? "&" : "?") + this.createParam(),
            // params: this.createParam(),
            responseType: "json",
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "application/json"
            },
            data: data
        };
    }
}

export default DataSet;

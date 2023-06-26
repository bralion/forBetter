/**
 * 配置模块
 */
import DATABIND_CALC_FN_LIST from "./config/DATABIND_CALC_FN_LIST";

const URLS = {
    //获取数据集列表
    GET_DATASET_LIST: "/xdatainsight/api/workspace/data/collection/analysis",
    //查询数据集下字段分组信息
    GET_FIELDS_BY_DATASET: "/xdatainsight/api/datacolletion/multitable/metadata",
    //sql、数据集等类型数据查询
    DATA_QUERY: "/xdatainsight/cda/api/query"
};

/**
 * 数据绑定相关配置信息
 */
const DATA_BIND = {
    CALC_FN: DATABIND_CALC_FN_LIST
};

export default class Config {
    constructor() {
        this.URLS = URLS;
        this.DATA_BIND = DATA_BIND;
    }

    getDatabindComponents() {

    }
}

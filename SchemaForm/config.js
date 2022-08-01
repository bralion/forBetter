import moment from 'moment';
import { ActionType } from './utils';
const dateFormat = 'YYYY/MM/DD';
// 新建长篇故事
export const stroySchema = {
    'version': '1.0',
    'type': 'object',
    'properties': {
        'formProps': {
            'colon': true,
            'layout': 'horizontal'
        },
        'rowProps': {
            'gutter': [20],
            'align': 'top'
        },
        'formList': [
            {
                'kId': 1,
                'title': 'name1',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '标题',
                    'labelAlign': 'right',
                    'labelCol': {
                        // span: 2, offset: 0
                    },
                    'wrapperCol': {
                        // span: 22, offset: 0
                    }
                },
                'componentProps': {
                    'placeholder': '请输入标题',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 2,
                'title': 'name2',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '父级ID',
                    'labelCol': {
                        // span: 4, offset: 0
                    },
                    'wrapperCol': {
                        // span: 20, offset: 0
                    },
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择父级ID'
                }
            },
            {
                'kId': 3,
                'title': 'name3',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '史诗故事',
                    'labelCol': {
                        // span: 4, offset: 0
                    },
                    'wrapperCol': {
                        // span: 20, offset: 0
                    },
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择史诗故事'
                }
            },
            {
                'kId': 4,
                'title': 'name4',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '负责人',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择负责人'
                }
            },
            {
                'kId': 5,
                'title': 'name5',
                'componentName': 'BaseRichEditor',
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseRichEditor',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 6,
                'title': 'name6',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '类型',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择类型'
                }
            },
            {
                'kId': 7,
                'title': 'name7',
                'componentName': 'BaseInput',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '关注人',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入关注人',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 8,
                'title': 'name8',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '需求获取方式',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择需求获取方式'
                }
            },
            {
                'kId': 9,
                'title': 'name9',
                'componentName': 'BaseInput',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '需求提出人',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入需求提出人',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 10,
                'title': 'name10',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '所属产品线',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择所属产品线'
                }
            },
            {
                'kId': 11,
                'title': 'name11',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '所属平台类型',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择所属平台类型'
                }
            },
            {
                'kId': 12,
                'title': 'name12',
                'componentName': 'BaseInput',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '计划发布版本',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入计划发布版本',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 13,
                'title': 'name13',
                'componentName': 'BaseDatePicker',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '需求提出时间',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请选择需求提出时间',
                    'format': dateFormat,
                    'defaultValue': moment('2022/06/18', dateFormat),

                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 14,
                'title': 'name14',
                'componentName': 'BaseDatePicker',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '期望完成时间',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请选择期望完成时间',
                    'format': dateFormat,
                    'defaultValue': moment('2022/06/18', dateFormat),

                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 15,
                'title': 'name15',
                'componentName': 'BaseDatePicker',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '实际开始时间',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请选择实际开始时间',
                    'format': dateFormat,
                    'defaultValue': moment('2022/06/18', dateFormat),

                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 16,
                'title': 'name16',
                'componentName': 'BaseDatePicker',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '实际完成时间',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请选择实际完成时间',
                    'format': dateFormat,
                    'defaultValue': moment('2022/06/18', dateFormat),

                    'disabled': false,
                    'allowClear': true
                }
            }
        ]
    }
}
// 任务新建需求
export const createSchema = {
    'version': '1.0',
    'type': 'object',
    'properties': {
        'rowProps': {
            'gutter': [20],
            'align': 'top'
        },
        'formList': [
            {
                'kId': 1,
                'title': 'name1',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '标题',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入标题',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 2,
                'title': 'name2',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '负责人',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择负责人'
                }
            },


            {
                'kId': 3,
                'title': 'name3',
                'componentName': 'BaseTextArea',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '任务内容',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入任务内容'
                }
            },
            {
                'kId': 4,
                'title': 'name4',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '工时',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入工时',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 5,
                'title': 'name5',
                'componentName': 'BaseInput',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '实际工时',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入实际工时',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 6,
                'title': 'name6',
                'componentName': 'BaseInput',
                'type': 'string',
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '剩余工时',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入剩余工时',
                    'defaultValue': 'xxx',
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 7,
                'title': 'name7',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '关联工作项类型',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择关联工作项类型'
                }
            },
            {
                'kId': 8,
                'title': 'name8',
                'componentName': 'BaseSelect',
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 12,
                    'gutter': []
                },
                'formItemProps': {
                    'label': '关联工作项',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择关联工作项'
                }
            }
        ]
    }
}
// UI组件
export const UISchema = {
    'version': '1.0',
    'type': 'object',
    'properties': {
        'formProps': {
            'colon': true
        },
        'rowProps': {
            'gutter': [20],
            'align': 'top'
        },
        'formList': [
            {
                'kId': 1,
                'title': 'name1',
                'componentName': 'BaseButton',
                // 'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseButton',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 2,
                'title': 'name2',
                'componentName': 'BaseCascader',
                // 'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                    children: [
                                        {
                                            value: 'xihu',
                                            label: 'West Lake'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: 'Nanjing',
                                    children: [
                                        {
                                            value: 'zhonghuamen',
                                            label: 'Zhong Hua Men'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseCascader',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择',
                    'defaultValue': []
                }
            },
            {
                'kId': 3,
                'title': 'name3',
                'componentName': 'BaseCheckbox',
                // 'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseCheckbox',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 4,
                'title': 'name4',
                'componentName': 'BaseDatePicker',
                // 'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseDatePicker',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请选择',
                    'format': dateFormat,
                    'defaultValue': moment('2022/06/18', dateFormat),
                    'disabled': false,
                    'allowClear': true
                }
            },
            {
                'kId': 5,
                'title': 'name5',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseInput',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 6,
                'title': 'name6',
                'componentName': 'BaseInputNumber',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseInputNumber',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'disabled': false,
                    'max': 10,
                    'min': 1,
                    'onPressEnter': () => {
                        console.log('onPressEnter');
                    }
                }
            },
            {
                'kId': 7,
                'title': 'name7',
                'componentName': 'BaseRadio',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseRadio',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 8,
                'title': 'name8',
                'componentName': 'BaseRichEditor',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseRichEditor',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 9,
                'title': 'name9',
                'componentName': 'BaseSelect',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseSelect',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择'
                }
            },
            {
                'kId': 10,
                'title': 'name10',
                'componentName': 'BaseSlider',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseSlider',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'defaultValue': 30
                }
            },
            {
                'kId': 11,
                'title': 'name11',
                'componentName': 'BaseTextArea',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseTextArea',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 12,
                'title': 'name12',
                'componentName': 'BaseTimePicker',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseTimePicker',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'defaultOpenValue': moment('00:00:00', 'HH:mm:ss')
                }
            },
            {
                'kId': 13,
                'title': 'name13',
                'componentName': 'BaseTransfer',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseTransfer',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            },
            {
                'kId': 14,
                'title': 'name14',
                'componentName': 'BaseTreeSelect',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'getTreeData': () => {
                    return [
                        {
                            title: 'Node1',
                            value: '0-0',
                            key: '0-0',
                            children: [
                                {
                                    title: 'Child Node1',
                                    value: '0-0-0',
                                    key: '0-0-0'
                                }
                            ]
                        },
                        {
                            title: 'Node2',
                            value: '0-1',
                            key: '0-1',
                            children: [
                                {
                                    title: 'Child Node3',
                                    value: '0-1-0',
                                    key: '0-1-0'
                                },
                                {
                                    title: 'Child Node4',
                                    value: '0-1-1',
                                    key: '0-1-1'
                                },
                                {
                                    title: 'Child Node5',
                                    value: '0-1-2',
                                    key: '0-1-2'
                                }
                            ]
                        }
                    ]
                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseTreeSelect',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'showSearch': true,
                    'width': '100%',
                    'dropdownStyle': { maxHeight: 400, overflow: 'auto' },
                    'placeholder': '请选择',
                    'allowClear': true,
                    'treeDefaultExpandAll': true
                }
            },
            {
                'kId': 15,
                'title': 'name15',
                'componentName': 'BaseUpload',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseUpload',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            }
        ]
    }
}
// 业务组件
export const BusinessSchema = {
    'version': '1.0',
    'type': 'object',
    'properties': {
        'formList': [
            {
                'type': 'string',
                'kId': 1,
                'title': 'name1',
                'componentName': 'ProvinceCity',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'ProvinceCity',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'defaultValue': {
                        prov: '北京',
                        city: '北京'
                    }
                }
            },
            {
                'type': 'string',
                'kId': 2,
                'title': 'name2',
                'componentName': 'ProvinceCity',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'ProvinceCity',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'defaultValue': {
                        prov: '上海',
                        city: '上海'
                    }
                }
            },
            {
                'kId': 3,
                'title': 'name3',
                'componentName': 'BaseRichEditor',
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'BaseRichEditor',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {}
            }
        ]
    }
}
// 组件联动
export const GangedSchema = {
    'version': '1.0',
    'type': 'object',
    'properties': {
        'formProps': {
            'colon': true
        },
        'rowProps': {
            'gutter': [20],
            'align': 'top'
        },
        'formList': [
            {
                'kId': 1,
                'title': '迭代',
                'componentName': 'BaseSelect',
                'isHidden': false,
                'type': 'string',
                'linkageOptions': [
                    {
                        'targetId': 2,
                        'name':'用户故事',
                        'actionType': ActionType.clear
                    },
                    {
                        'targetId': 3,
                        'actionType': ActionType.setPlaceholder,
                        'placeholder': '重新设置默认值'
                    },
                    {
                        'targetId': 4,
                        'actionType': ActionType.setCurValue,
                        'curValue': '最新的值xxxxx'
                    },
                    {
                        'targetId': 5,
                        'actionType': ActionType.fetchData
                    },

                    {
                        'targetId': 6,
                        'actionType': ActionType.setCurValue,
                        'curValue': '33'
                    }
                ],
                'getOptions': () => {
                    return [
                        {
                            title: '11',
                            value: '11'
                        },
                        {
                            title: '22',
                            value: '22'
                        },
                        {
                            title: '33',
                            value: '33'
                        }
                    ]
                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name2清空+name3默认值+name4值+name5重新拉取数据+name6值',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择'
                }
            },
            {
                'kId': 2,
                'title': 'name2',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name2',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'defaultValue': 'xxxxxx',
                    'placeholder': '请输入',
                    'allowClear': true
                }
            },
            {
                'kId': 3,
                'title': 'name3',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name3',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入',
                    'allowClear': true
                }
            },
            {
                'kId': 4,
                'title': 'name4',
                'componentName': 'BaseInput',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name4',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'placeholder': '请输入',
                    'allowClear': true
                }
            },
            {
                'kId': 5,
                'title': 'name5',
                'componentName': 'BaseSelect',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'getOptions': ({ value = '11' } = {}) => {
                    if (value === '11') {
                        return [
                            {
                                title: '11',
                                value: '11'
                            },
                            {
                                title: '22',
                                value: '22'
                            },
                            {
                                title: '33',
                                value: '33'
                            }
                        ]
                    } else {
                        return [
                            {
                                title: '11111111',
                                value: '11111111'
                            },
                            {
                                title: '22222222',
                                value: '22222222'
                            },
                            {
                                title: '3333333',
                                value: '3333333'
                            }
                        ]
                    }

                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name5',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择'
                }
            },
            {
                'kId': 6,
                'title': 'name6',
                'componentName': 'BaseSelect',
                'rules': [{ 'required': true, 'message': '请输入标题' }],
                'isHidden': false,
                'type': 'string',
                'getOptions': ({ value = '11' } = {}) => {
                    if (value === '11') {
                        return [
                            {
                                title: '11',
                                value: '11'
                            },
                            {
                                title: '22',
                                value: '22'
                            },
                            {
                                title: '33',
                                value: '33'
                            }
                        ]
                    } else {
                        return [
                            {
                                title: '11111111',
                                value: '11111111'
                            },
                            {
                                title: '22222222',
                                value: '22222222'
                            },
                            {
                                title: '3333333',
                                value: '3333333'
                            }
                        ]
                    }

                },
                'colProps': {
                    'span': 24,
                    'gutter': []
                },
                'formItemProps': {
                    'label': 'name6',
                    'labelCol': {},
                    'wrapperCol': {},
                    'labelAlign': 'right'
                },
                'componentProps': {
                    'allowClear': true,
                    'placeholder': '请选择'
                }
            }
        ]
    }
}

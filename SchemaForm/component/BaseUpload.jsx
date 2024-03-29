import React, { forwardRef } from 'react';
import { Upload, message, Button, Icon } from 'antd';

const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text'
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

const BaseUpload = (props) => {
    const {
        componentProps = {}
    } = props

    return (
        <Upload
            {...uploadProps}
            {...componentProps}
        >
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </Upload>
    )
}
export default forwardRef(BaseUpload)
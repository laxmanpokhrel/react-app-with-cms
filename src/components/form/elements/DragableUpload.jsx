import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
const { Dragger } = Upload;

const DragableUpload = (props) => {
    const { className, ...params } = props;
    return (
        <div className={className}>
            <Dragger
                name="file"
                multiple
                {...params}
                beforeUpload={() => {
                    return false;
                }}
                fileList={props.fileList}
            // showUploadList={params.showList}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint"></p>
            </Dragger>
        </div>
    )
}
export default DragableUpload;
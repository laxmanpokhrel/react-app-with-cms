import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const App = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const { className, ...params } = props
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = (e) => {
        // console.log("from upload handle change: ", e.fileList[0])
        params.onChange(e)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""}{props.required && "*"}</label>
            <Upload
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                accept=".png,.jpeg,.jpg,.gif"
                beforeUpload={(file) => {
                    // console.log("file is: ", file)
                    // if returned false it won't upload and if returned true it will upload
                    return false
                }}
            // customRequest={dummyRequest}
            >
                {fileList.length >= params.count ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error ? params.errormessage : ""}</h5>

        </div>
    );
};

export default App;
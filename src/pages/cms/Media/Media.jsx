import React, { useState } from "react";
import { useDispatch } from "react-redux/";
import { postMultipleMedia } from "../../../store/mediaSlice";
import Form from "../../../components/form/Form";
import FormControls from "../../../components/form/FormControls";
import FormControl from "../../../components/form/FormControl";
import FormActions from "../../../components/form/FormActions";
import FormAction from "../../../components/form/FormAction";
import ControlRow from "../../../components/form/ControlRow";
import ActionRow from "../../../components/form/ActionRow";
import ImageList from "./ImageList";

const Media = () => {
    const [fileUploaded, setFileUploaded] = useState([]);
    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        const formDataArray = [];
        e.preventDefault();
        fileUploaded.forEach(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", "Undefined");
            formDataArray.push(formData);
        });
        dispatch(postMultipleMedia({ formDataArray }));
        setFileUploaded([]);
    }
    const mediaChangeHandler = (info) => {
        setFileUploaded(prev => {
            return [info.file, ...prev];
        });
    }

    const mediaDropHandler = (e) => {
        console.log('Dropped files', e.dataTransfer.files);

    }
    return (
        <>
            <Form onSubmit={formSubmitHandler}>
                <FormControls>
                    <ControlRow>
                        <FormControl
                            type="dragableUpload"
                            onChange={mediaChangeHandler}
                            onDrop={mediaDropHandler}
                            // showList={showMediaList}
                            fileList={fileUploaded}
                        />
                    </ControlRow>
                    {/* <ControlRow>
                        <input
                            required
                            type="file"
                            onChange={uploadFileChangeHandler}
                            filename={uploadedFile}
                        />
                    </ControlRow> */}
                </FormControls>
                <FormActions>
                    <ActionRow>
                        <FormAction type="submit">Submit</FormAction>
                    </ActionRow>
                </FormActions>
            </Form>
            <ImageList />
        </>
    )
}
export default Media;
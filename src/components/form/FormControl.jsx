import React from 'react';
import PasswordField from "./elements/PasswordField"
import RadioButtons from "./elements/RadioButtons"
import Select from "./elements/Select"
import TextField from "./elements/TextField"
import TextAreaElement from "./elements/TextAreaElement"
import TextEditor from "./elements/TextEditor"
import Upload from "../form/elements/Upload"
import SwitchElement from "./elements/SwitchElement"
import NumberElement from "./elements/NumberElement"
import DatePickerElement from "./elements/DatePickerElement"
import DragableUpload from "./elements/DragableUpload"
import MediaSelect from "./elements/MediaSelect"
import LinkInput from "./elements/LinkInput"
const FormControl = (props) => {
    const { type, ...params } = props
    switch (type) {
        case "text":
            return <TextField className="form-control" {...params} />
        case "password":
            return <PasswordField className="form-control" {...params} />
        case "select":
            return <Select className="form-control" {...params} />
        case "radio":
            return <RadioButtons className="form-control" {...params} />
        case "textArea":
            return <TextAreaElement className="form-control" {...params} />
        case "textEditor":
            return <TextEditor className="form-control-text-editor" {...params} />
        case "image":
            return <Upload className="form-control" {...params} />
        case "switch":
            return <SwitchElement className="form-control" {...params} />
        case "number":
            return <NumberElement className="form-control" {...params} />
        case "datePicker":
            return <DatePickerElement className="form-control" {...params} />
        case "dragableUpload":
            return <DragableUpload className="form-control-draggable-upload" {...params} />
        case "mediaSelect":
            return <MediaSelect className="form-control" {...params} />
        case "linkInput":
            return <LinkInput className="form-control-link-input" {...params} />
        default:
            return <div>Error!</div>
    }
}
export default FormControl
import React from 'react';
import firstLetterCaps from '../../../utils/firstLetterCaps';
import { Input } from 'antd';
const { TextArea } = Input;
const TextAreaElement = (props) => {
    const { className, ...params } = props;

    return (
        <div className={className} style={{ "width": "50%" }}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <TextArea {...params} />
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error ? params.errormessage : ""}</h5>
        </div>
    )
}
export default TextAreaElement
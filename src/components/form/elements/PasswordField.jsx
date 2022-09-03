import React from 'react';
import { Input } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const PasswordField = (props) => {
    const { className, placeholder, onChange, ...params } = props
    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <Input.Password size="large" status={params.error && "error"} placeholder={placeholder} onChange={onChange} />
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error === "true" ? params.errormessage : ""}</h5>
        </div>
    )
}
export default PasswordField
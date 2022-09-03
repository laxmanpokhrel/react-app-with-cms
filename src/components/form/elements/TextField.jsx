import React from 'react';
import { Input } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const TextField = (props) => {
    const { className, placeholder, ...params } = props;
    return (
        <div className={className} >
            <label>{props.label ? firstLetterCaps(props.label) : ""} {params.required && "*"}</label>
            <Input
                status={params.error && "error"}
                placeholder={placeholder}
                {...params}
            />
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error && params.errormessage}</h5>
        </div>
    )
}
export default TextField
import React from 'react';
import { Radio } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';

const RadioButtons = (props) => {
    console.log("params from radio", props)
    const { className, options, ...params } = props

    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {params.required && "*"}</label>
            <Radio.Group onChange={props.onChange}>
                {options.map((option, index) => <Radio key={index} value={option}>{firstLetterCaps(option)}</Radio>)}
            </Radio.Group>
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error && params.errormessage}</h5>

        </div >
    )
}
export default RadioButtons
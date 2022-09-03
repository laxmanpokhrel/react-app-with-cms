import React from 'react';
import { InputNumber } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const NumberElement = (props) => {
    const { className, onChange, ...params } = props;
    const onChangeHandler = (value) => {
        onChange({
            target: {
                value
            }
        })
    };
    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <InputNumber
                onChange={onChangeHandler}
                {...params}
            />
            {/* <input type="number" min={1} max={10} defaultValue={3} {...params} /> */}
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error && params.errormessage ? params.errormessage : ""}</h5>
        </div>
    )
}
export default NumberElement
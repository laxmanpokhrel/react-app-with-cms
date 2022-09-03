import React from 'react';
import { DatePicker } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const { RangePicker } = DatePicker;
const DatePickerElement = (props) => {
    const { className, onChange, ...params } = props;
    const changeHandler = (value, dateString) => {
        onChange({
            target: {
                value
            }
        })
    };

    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <DatePicker onChange={changeHandler} {...params} />
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error && params.errormessage ? params.errormessage : ""}</h5>
        </div>
    )
}
export default DatePickerElement
import React from 'react';
import { Select } from 'antd';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const SelectElement = (props) => {
    const { className, onChange, ...params } = props
    const { Option } = Select;
    const handleChange = (value) => {
        onChange({ target: { value } })
    };
    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <Select
                defaultValue={[params.defaultValue ? firstLetterCaps(params.defaultValue) : ""]}
                style={{
                    width: 120,
                }}
                onChange={handleChange}
            >
                {props.options ? props.options.map((item, index) => <Option key={index} value={item}>{firstLetterCaps(item)}</Option>) : (() => { })()}

            </Select>
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error ? params.errorMessage : ""}</h5>
        </div>



    )
}
export default SelectElement
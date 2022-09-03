import React from 'react';
import { Switch } from "antd";
import { useState } from "react";
import firstLetterCaps from "../../../utils/firstLetterCaps";
const SwitchElement = (props) => {
    const { className, onChange, ...params } = props
    const [reverse, setReverse] = useState(true);
    const changeHandler = (value) => {
        onChange({
            target: {
                value
            }
        })
    }
    return (
        <div className={className}>
            <div>
                <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
                <Switch defaultChecked onChange={changeHandler}{...params} style={{ "marginLeft": "5px" }} />
            </div>
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error ? params.errormessage : ""}</h5>
        </div >
    )
}
export default SwitchElement
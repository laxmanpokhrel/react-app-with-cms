import React from 'react';
import ButtonElement from "./elements/ButtonElement"

const FormAction = (props) => {
    const { type, onSubmit, ...params } = props;
    switch (type) {
        case "submit":
            return <button className="submit-button" type={type} {...params}>{props.children}</button>
        case "button":
            return <button className="button" type={type} onClick={props.onClick ? props.onClick : (() => { })()} {...params}>{props.children}</button>
        case "cancel":
            return <button className="cancel-button" type={type} onClick={props.onClick ? props.onClick : (() => { })()} {...params}>{props.children}</button>
        default:
            return <div>Error!</div>
    }
}
export default FormAction
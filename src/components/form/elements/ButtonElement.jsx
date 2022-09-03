import React from 'react';
import { Button } from 'antd';

const ButtonElement = (props) => {
    return (
        <div style={{ padding: ".5rem" }}>
            <Button {...props}>{props.children}</Button>
        </div>
    )
}
export default ButtonElement
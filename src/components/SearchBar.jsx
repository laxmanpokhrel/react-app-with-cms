import React from "react";
import { Input } from 'antd';
import { useState } from 'react';
const { Search } = Input;

const SearchBar = (props) => {
    const [noAction, setNoAction] = useState(true);
    const onChageHandler = () => {
        setNoAction(false);
    }
    return (
        <Search
            style={{ "width": "50%", "marginBottom": "1rem" }}
            size="large"
            placeholder="input search text"
            onChange={onChageHandler}
            onSearch={(value) => {
                if (value) props.onSearch(value);
                if (!noAction && !value) {
                    setNoAction(true);
                    props.onNoString()
                };
            }}
            allowClear
            enterButton />
    )
}
export default SearchBar;
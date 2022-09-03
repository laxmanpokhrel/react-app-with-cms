import firstLetterCaps from '../../../utils/firstLetterCaps';
import { AutoComplete, Input, Image, Avatar } from 'antd';
import React, { useState } from 'react';

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* <span>
                            Found {query} on{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span> */}
                        <Avatar src={<Image src="http://localhost:3001/api/v1/file/image/eye-3221498.jpg" style={{ width: 50 }} />} />
                        <h2>
                            hello there
                        </h2>
                    </div>
                ),
            };
        });

const MediaSelect = (props) => {
    const { className, ...params } = props;
    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };
    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""} {props.required && "*"}</label>
            <AutoComplete
                dropdownMatchSelectWidth={25}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={params.onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="large" placeholder={params.placeholder} enterButton />
            </AutoComplete>
            {/* <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error && params.errormessage ? params.errormessage : ""}</h5> */}
        </div>
    )
}
export default MediaSelect;
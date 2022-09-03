import React from 'react';
import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';

const PresentWorkingPanel = () => {
    const presentWorkingPage = useSelector(state => state.pwp.dirList);
    return (
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            {presentWorkingPage?.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
        </Breadcrumb>
    )
}
export default PresentWorkingPanel
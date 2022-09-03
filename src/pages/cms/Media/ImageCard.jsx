import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const ImageACard = (props) => (
    <Card
        style={{
            width: 240,
        }}
        cover={<img alt={props.alt} src={props.url} />}
    >
        <Meta title={props.title} description={props.description} />
    </Card>
);

export default ImageACard;
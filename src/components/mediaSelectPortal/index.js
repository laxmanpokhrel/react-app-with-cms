import React from "react";
import Portal from "./Portal";
const MediaSelect = (props) => {
    const { isVisible, ...params } = props;
    if (isVisible) return <Portal {...params} />
}
export default MediaSelect;
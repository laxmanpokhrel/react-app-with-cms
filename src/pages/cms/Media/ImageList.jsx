
import { useSelector, useDispatch } from "react-redux"
import React, { useEffect, useState } from "react";
import { getAllMedia } from "../../../store/mediaSlice";
import MediaGrid from "./MediaGrid";

const ImageList = () => {
    const mediaList = useSelector(state => state.media.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMedia());
    }, []);
    if (mediaList.length) {
        return <MediaGrid data={mediaList} />
    } else {
        return <div>No data found!</div >
    }
}
export default ImageList;
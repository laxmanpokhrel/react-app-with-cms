import { Image } from "antd"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import classes from "./ImageCard.module.css";
import { TiTickOutline } from "react-icons/ti";
import isExistInArray from "../../utils/isExistsInArray";
import { useEffect } from "react";
import { mediaSelectActions } from "../../store";
const ImageCard = (props) => {
    const selectedList = useSelector(state => state.mediaSelect.list)
    useEffect(() => {
        const { status, index } = isExistInArray(selectedList, { src, caption });
        setIsSelected(status)
    }, [selectedList]);
    const { imgProps, ...params } = props;
    const { src, caption } = imgProps;
    const [isSelected, setIsSelected] = useState(false);
    const dispatch = useDispatch();
    return (
        <div
            className={`${classes["image-card"]} ${isSelected && classes["selected"]}`}
            onClick={(e) => {
                e.stopPropagation();
                !isSelected && !params.multiple && dispatch(mediaSelectActions.addSelectedItem({ media: { src, caption }, mode: "single" }));
                isSelected && !params.multiple && dispatch(mediaSelectActions.deleteSelectedItem({ media: { src, caption }, mode: "single" }));
                !isSelected && params.multiple && dispatch(mediaSelectActions.addSelectedItem({ media: { src, caption }, mode: "multiple" }));
                isSelected && params.multiple && dispatch(mediaSelectActions.deleteSelectedItem({ media: { src, caption }, mode: "multiple" }));
            }}
        >
            <Image {...imgProps} />
            <p className={classes["caption"]}>{props.caption}</p>
            {isSelected ? <p className={classes["tick-icon"]}><TiTickOutline color="white" /></p> : (() => { })()}
        </div >
    )
}
export default ImageCard

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { List, Tag } from "antd"
import { getAllMedia } from "../../store/mediaSlice";
import { mediaSelectActions } from "../../store";
import ImageCard from "./ImageCard";
import classes from "./MediaSelectDialog.module.css"
import GreenButton from "../buttons/GreenButton";
import RedButton from "../buttons/RedButton";

const MediaSelectDialog = (props) => {
    useEffect(() => {
        if (!media.length) dispatch(getAllMedia());
    }, [])
    const media = useSelector(state => state.media.list)
    const selectedItem = useSelector(state => state.mediaSelect.list)
    const dispatch = useDispatch();
    const { multiple, ...params } = props;
    const cancelSubmitHandler = () => {

    }
    return (
        <div {...params}
            className={classes["modal-select-dialogbox"]}
        >
            <div className={classes["header"]}>
                <h4>Select Media</h4>
                <h6>Selected Media: {selectedItem?.map((item, index) =>
                    <Tag
                        color={item.caption ? "#0034f0" : "#f01400"}
                        key={index}
                    // closable
                    // onClose={() => {
                    //     setSelectedItem(prevState => {
                    //         const itemIndex = prevState.findIndex(x => x.src === item.src);
                    //         prevState.splice(itemIndex, 1);
                    //         console.log("index: ", itemIndex);
                    //         let temp = prevState;
                    //         temp.splice(itemIndex, 1);
                    //         return [...temp];
                    //     })
                    // }}
                    >
                        {item.caption ? item.caption : "undefined caption"}
                    </Tag>)}
                </h6>
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 28,
                    size: "small",
                    showSizeChanger: false,
                }}
                className={classes["list"]}
                dataSource={media}
                grid={{ gutter: 2, column: 7, row: 3 }}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        bordered={true}
                    >
                        <ImageCard
                            imgProps={{
                                preview: false,
                                width: 110,
                                height: 80,
                                src: item?.url,
                                alt: item?.alt,
                                caption: item?.title,
                                onLoad: () => {
                                    return <h4>Loading...</h4>
                                }
                            }}
                            multiple={multiple}
                        />
                    </List.Item>
                )}
            />
            <div className={classes["footer"]}>
                <GreenButton onClick={props.onConfirm}>Add</GreenButton>
                <RedButton onClick={() => {
                    console.log("cancel button clicked")
                    dispatch(mediaSelectActions.initializeList());
                    props.onCancel();
                }}>
                    Cancel
                </RedButton>
            </div>

        </div>
    )
}
export default MediaSelectDialog;
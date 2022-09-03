import React from 'react';
import { Button, Drawer, Space, Image } from 'antd';
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { updateMedia, deleteMedia } from '../store/mediaSlice';
import Form from './form/Form';
import FormControls from './form/FormControls';
import FormControl from './form/FormControl';
import FormActions from './form/FormActions';
import FormAction from './form/FormAction';
import ActionRow from './form/ActionRow';
import ControlRow from './form/ControlRow';
import useInput from '../hooks/useInput';
import Portal from "./Portal/Portal";
const DrawerElement = (props) => {
    const drawerData = useSelector(state => state.drawer.content);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    useEffect(() => {
        setEnteredTitle(drawerData?.title);
        setEnteredDescription(drawerData?.description);
        setEnteredKeyword(drawerData?.keywords);
        setEnteredAlt(drawerData?.alt);
    }, [drawerData])
    const dispatch = useDispatch();
    const {
        value: enteredTitle,
        setValue: setEnteredTitle,
        hasError: enteredTitleHasError,
        reset: resetTitle,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler
    } = useInput(value => true);

    const {
        value: enteredDescription,
        setValue: setEnteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: enteredDescriptionHasError,
        reset: resetDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler
    } = useInput(value => true);

    const {
        value: enteredKeyword,
        setValue: setEnteredKeyword,
        isValid: enteredKeywordIsValid,
        hasError: enteredKeywordHasError,
        reset: resetKeyword,
        valueChangeHandler: keywordChangeHandler,
        inputBlurHandler: keywordBlurHandler
    } = useInput(value => true);

    const {
        value: enteredAlt,
        setValue: setEnteredAlt,
        isValid: enteredAltIsValid,
        hasError: enteredAltHasError,
        reset: resetAlt,
        valueChangeHandler: altChangeHandler,
        inputBlurHandler: altBlurHandler
    } = useInput(value => true);
    // setEnteredTitle(drawerData?.title);
    // setEnteredDescription(drawerData?.description);
    // setEnteredAlt(drawerData?.alt);
    // setEnteredKeyword(drawerData?.keywords);
    const resetForm = () => {
        resetTitle();
        resetDescription();
        resetKeyword();
        resetAlt();
    }


    const formSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_id", drawerData?._id);
        formData.append("url", drawerData?.url);
        formData.append("title", enteredTitle);
        formData.append("description", enteredDescription);
        formData.append("keywords", enteredKeyword);
        formData.append("alt", enteredAlt);
        dispatch(updateMedia({ formData, closeDrawer: props.onClose }));
        resetForm();
    }
    return (
        <Drawer
            title={drawerData?.title}
            placement="right"
            width={500}
            onClose={props.onClose}
            visible={props.visible}
            style={{ "zIndex": 1 }}
            extra={
                <Space style={{
                    "fontSize": "2rem",
                    "color": "red",
                    "cursor": "pointer"
                }}>
                    <AiFillDelete onClick={() => {
                        setDeleteId(drawerData?._id);
                        setDeleteConfirmation(true);
                    }} />
                </Space>
            }
        >
            <div style={{
                "display": "flex",
                "alignItems": "flex-start",
                "flexDirection": "column",
            }}>
                <Image
                    src={drawerData?.url}
                />
                <Form onSubmit={formSubmitHandler}>
                    <FormControls>
                        <ControlRow>
                            <FormControl
                                type="text"
                                label="Image Title"
                                placeholder="Title"
                                value={enteredTitle}
                                onChange={titleChangeHandler}
                            />
                            <FormControl
                                type="text"
                                label="Image Alt"
                                placeholder="Alternate text"
                                value={enteredAlt}
                                onChange={altChangeHandler}
                            />
                        </ControlRow>
                        <ControlRow>
                            <FormControl
                                type="text"
                                label="Image keywords"
                                placeholder="Keywords"
                                value={enteredKeyword}
                                onChange={keywordChangeHandler}
                            />
                            <FormControl
                                type="textArea"
                                label="Image Description"
                                placeholder="Description"
                                value={enteredDescription}
                                onChange={descriptionChangeHandler}
                                rows={1}
                            />
                        </ControlRow>
                    </FormControls>
                    <FormActions>
                        <ActionRow>
                            <FormAction type="submit">Save</FormAction>
                        </ActionRow>
                    </FormActions>
                </Form>
            </div>
            {deleteConfirmation && <Portal
                confirmationMessage="Are you sure you want to delete this item?"
                onConfirm={() => {
                    dispatch(deleteMedia({ _id: deleteId, closeDrawer: props.onClose }))
                    setDeleteConfirmation(false);
                }}
                onReject={() => setDeleteConfirmation(false)} />}
        </Drawer>
    )
}
export default DrawerElement
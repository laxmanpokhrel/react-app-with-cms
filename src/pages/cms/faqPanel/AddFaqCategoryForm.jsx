import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faqCategoryActions, pwpActions } from "../../../store";
import FormControl from "../../../components/form/FormControl";
import Form from "../../../components/form/Form";
import ControlRow from "../../../components/form/ControlRow";
import FormControls from "../../../components/form/FormControls";
import FormAction from "../../../components/form/FormAction";
import FormActions from "../../../components/form/FormActions";
import ActionRow from "../../../components/form/ActionRow";
import useInput from "../../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { postFaqCategory, putFaqcategory } from "../../../store/faqCategorySlice";

const AddFaqForm = () => {
    const dispatch = useDispatch();
    const editItem = useSelector(state => state.faqCategory.editItem);
    useEffect(() => {
        resetForm();
        if (editItem) fillForm(editItem)
    }, [editItem]);

    const {
        value: enteredCategory,
        setValue: setEnteredCategory,
        reset: resetCategory,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler
    } = useInput(value => value !== "");
    const {
        value: enteredPublishValue,
        setValue: setEnteredPublishValue,
        reset: resetPublishStat,
        valueChangeHandler: publishStatChangeHandler,
    } = useInput(value => true);
    const {
        value: enteredDisplayOrder,
        setValue: setDisplayOrder,
        hasError: enteredDisplayOrderHasError,
        reset: resetDisplayOrder,
        valueChangeHandler: displayOrderChangeHandler,
    } = useInput(value => (value >= 1 && value <= 10));

    const resetForm = () => {
        resetCategory();
        setDisplayOrder("1");
        resetPublishStat();
    }
    const fillForm = (data) => {
        setEnteredCategory(data.category);
        setDisplayOrder(data.displayOrder);
        setEnteredPublishValue(data.isPublish);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        if (editItem) formData.append("_id", editItem._id);
        formData.append("category", enteredCategory || undefined);
        formData.append("displayOrder", enteredDisplayOrder || 1);
        formData.append("isPublish", enteredPublishValue || false);
        if (!editItem) {
            dispatch(postFaqCategory({ formData, resetForm }))
        }
        if (editItem) {
            dispatch(putFaqcategory({ formData, resetForm }))
        }
    }


    return (
        <Form onSubmit={formSubmitHandler}>
            <FormControls>
                <ControlRow>
                    <FormControl
                        type="text"
                        label="Faq Catagory"
                        required
                        value={enteredCategory}
                        errormessage="Faq category must be selected."
                        onChange={categoryChangeHandler}
                        onBlur={categoryBlurHandler}
                    />
                    <FormControl
                        type="number"
                        label="Display Order"
                        name="displayOrder"
                        error={enteredDisplayOrderHasError}
                        errormessage="Display order is not valid."
                        defaultValue="1"
                        value={enteredDisplayOrder}
                        min={1}
                        max={10}
                        onChange={displayOrderChangeHandler}
                    />
                </ControlRow>
                <ControlRow>
                    <FormControl
                        type="switch"
                        label="Publish"
                        name="isPublish"
                        onChange={publishStatChangeHandler}
                        checked={enteredPublishValue}
                    />
                </ControlRow>
            </FormControls>
            <FormActions>
                <ActionRow>
                    <FormAction type="submit">Add</FormAction>
                    {editItem &&
                        <FormAction type="cancel"
                            onClick={() => {
                                dispatch(faqCategoryActions.initializeEditItem());
                                resetForm();
                            }}
                        >
                            Cancel
                        </FormAction>}
                </ActionRow>
            </FormActions>
        </Form>
    )
}
export default AddFaqForm;
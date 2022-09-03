import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pwpActions } from "../../../store";
import FormControl from "../../../components/form/FormControl";
import Form from "../../../components/form/Form";
import ControlRow from "../../../components/form/ControlRow";
import FormControls from "../../../components/form/FormControls";
import FormAction from "../../../components/form/FormAction";
import FormActions from "../../../components/form/FormActions";
import ActionRow from "../../../components/form/ActionRow";
import useInput from "../../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { postFaq, putFaq, getOneFaq } from "../../../store/faqSlice";
import { getAllFaqcategory } from "../../../store/faqCategorySlice";

const AddFaqForm = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(pwpActions.changePwp(["Dashboard", "Add Faq"]));
        dispatch(getAllFaqcategory());
    }, []);
    useEffect(() => {
        if (props.editMode) dispatch(getOneFaq({ faqId: props.faqId, fillForm }));
        else resetForm();
    }, [props.editMode]);

    const categories = useSelector(state => state.faqCategory.list);
    const data = [];
    categories.forEach((item) => {
        if (item.isPublish) data.push(item.category)
    })
    console.log("data :", data);
    const navigate = useNavigate();
    const {
        value: enteredCategory,
        setValue: setEnteredCategory,
        reset: resetCategory,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler
    } = useInput(value => value !== "");
    const {
        value: enteredTitle,
        setValue: setEnteredTitle,
        hasError: enteredTitleHasError,
        reset: resetTitle,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler
    } = useInput(value => value?.length);
    const {
        value: enteredDescription,
        setValue: setEnteredDescription,
        reset: resetDescription,
        valueChangeHandler: descriptionChangeHandler,
    } = useInput(value => value?.length > 0);
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
        resetTitle();
        resetDescription();
        setDisplayOrder("1");
        resetPublishStat();
    }
    const fillForm = (data) => {
        setEnteredTitle(data.title);
        setDisplayOrder(data.displayOrder);
        setEnteredCategory(data.category);
        setEnteredDescription(data.description);
        setEnteredPublishValue(data.isPublish);
    }
    const formSubmitHandler = (e) => {
        console.log("submitted", props.editMode)
        try {
            e.preventDefault();

            const formData = new FormData()
            if (props.editMode) formData.append("_id", props.faqId);
            formData.append("category", enteredCategory || undefined);
            formData.append("title", enteredTitle.trim() || undefined);
            formData.append("displayOrder", enteredDisplayOrder || 1);
            formData.append("description", enteredDescription.trim() || undefined);
            formData.append("isPublish", enteredPublishValue || false);
            console.log("form data")
            if (!props.editMode) {
                dispatch(postFaq({ formData, resetForm }))
            }
            if (props.editMode) {
                console.log("edit mode")
                dispatch(putFaq({ formData, navigate: () => navigate("/admin/viewFaq") }))
            }
        } catch (err) {
            console.log("error from catch: ", err)
        }

    }

    return (
        <Form onSubmit={formSubmitHandler}>
            <FormControls>
                <ControlRow>
                    <FormControl
                        type="select"
                        label="Faq Catagory"
                        required
                        value={enteredCategory}
                        options={data}
                        errormessage="Faq category must be selected."
                        onChange={categoryChangeHandler}
                        onBlur={categoryBlurHandler}
                    />
                </ControlRow>
                <ControlRow>
                    <FormControl
                        type="text"
                        label="Title"
                        name="title"
                        placeholder="Faq title."
                        errormessage="Please enter valid faq."
                        required
                        value={enteredTitle}
                        error={enteredTitleHasError}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                    />
                </ControlRow>
                <ControlRow>
                    <FormControl
                        type="textArea"
                        label="Short Description"
                        placeholder="FAQ description"
                        name="description"
                        rows={3}
                        value={enteredDescription}
                        onChange={descriptionChangeHandler}
                    />
                </ControlRow>
                <ControlRow>
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
                    <FormAction type="submit">Submit</FormAction>
                </ActionRow>
            </FormActions>
        </Form>
    )
}
export default AddFaqForm;
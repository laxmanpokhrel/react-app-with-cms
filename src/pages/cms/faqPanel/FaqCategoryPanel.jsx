import React, { useEffect } from "react";
import AddFaqCategoryForm from "./AddFaqCategoryForm";
import ViewFaqCategory from "./ViewFaqCategory";
import { pwpActions } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

const FaqCategoryPanel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pwpActions.changePwp(["Dashboard", "Add Faq Category"]));
    }, []);
    return (
        <div>
            <AddFaqCategoryForm />
            <ViewFaqCategory />
        </div>
    )
}
export default FaqCategoryPanel;
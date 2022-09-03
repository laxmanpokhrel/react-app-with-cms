import React from "react";
import AddFaqForm from "./AddFaqForm";
import { useParams } from 'react-router-dom';

const FaqPanel = (props) => {
    const { faqId } = useParams();
    return (
        <AddFaqForm
            {...props}
            faqId={faqId}
        />
    )
}
export default FaqPanel
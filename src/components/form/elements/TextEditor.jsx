import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import firstLetterCaps from '../../../utils/firstLetterCaps';
const TextEditor = (props) => {
    const { className, onChange, placeholder, ...params } = props;
    const { quill, quillRef } = useQuill({ placeholder });
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                onChange ? onChange({
                    target: {
                        value: quill.root.innerHTML
                    }
                }) : (() => { })()
            });
        }
    }, [quill]);
    console.log("props from test editor", props)

    return (
        <div className={className}>
            <label>{props.label ? firstLetterCaps(props.label) : ""}{props.required && "*"}</label>
            <div style={{ "width": "100%" }}>
                <div ref={quillRef} />
            </div >
            <h5 style={{ color: "rgb(242, 20, 20)" }}>{params.error ? params.errormessage : ""}</h5>
        </div>
    );
};
export default TextEditor
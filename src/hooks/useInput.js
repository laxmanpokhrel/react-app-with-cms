import { useState } from "react"
const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState(undefined);
    const [isTouched, setIsTouched] = useState(false);
    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;
    const valueChangeHandler = e => {
        setEnteredValue(e.target.value)
    }
    const fileChangeHandler = value => {
        setUploadedFile(value.target.files[0])
    }
    const inputBlurHandler = () => {
        setIsTouched(true);
    }
    const setValue = (value) => {
        setEnteredValue(value);
    }
    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    const resetFile = () => {
        setUploadedFile("");
    }
    return {
        value: enteredValue,
        file: uploadedFile,
        isValid: valueIsValid,
        hasError,
        reset,
        resetFile,
        setValue,
        valueChangeHandler,
        inputBlurHandler,
        fileChangeHandler,
    }
}
export default useInput;
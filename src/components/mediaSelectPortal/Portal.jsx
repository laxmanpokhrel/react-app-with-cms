import BackDrop from "./Backdrop";
import MediaSelectDialog from "./MediaSelectDialog";
import ReactDOM from "react-dom";
import classes from "./Portal.module.css"
import { useDispatch } from "react-redux"
import { mediaSelectActions } from "../../store";

const Portal = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            {ReactDOM.createPortal(<BackDrop
                className={classes["backdrop"]}
                onClick={() => {
                    props.onCancel()
                }}
            />, document.getElementById("mediaSelectDrop-root"))}
            {ReactDOM.createPortal(<MediaSelectDialog
                {...props}
            />, document.getElementById("selectModal-root"))}
        </>
    )
}
export default Portal;
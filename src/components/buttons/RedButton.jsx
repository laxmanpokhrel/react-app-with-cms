import classes from "./Buttons.module.css"
const RedButton = (props) => {
    return (
        <button type="button" className={classes["red-button"]} {...props}>
            {props.children}
        </button>
    )
}
export default RedButton;
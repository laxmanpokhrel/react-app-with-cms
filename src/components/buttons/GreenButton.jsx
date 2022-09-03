import classes from "./Buttons.module.css";
const GreenButton = (props) => {
    return (
        <button type="button" className={classes["green-button"]} {...props}>{props.children}</button>
    )
}
export default GreenButton;
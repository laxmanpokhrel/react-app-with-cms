import classes from "./Backdrop.module.css";
const BackDrop = (props) => {
    return <div
        className={`${classes["overlay"]} ${props.className}`}
        onClick={props.onClick} />
}
export default BackDrop;
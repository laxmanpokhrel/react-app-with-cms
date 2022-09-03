import Portal from "./Portal";
const portal = (props) => {
    const { isVisible, ...params } = props;
    if (isVisible) return <Portal {...params} />
}
export default portal;
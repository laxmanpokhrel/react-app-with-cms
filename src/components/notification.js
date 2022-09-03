import { notification } from 'antd';

notification.config({
    placement: 'bottomRight',
    bottom: 0,
    left: 0,
    duration: 3.5,
    rtl: false,
});
const openNotificationWithIcon = (type, details) => {
    notification[type]({
        message: details.message,
        description: details.description,
        style: { "padding": ".5rem", "fontWeight": "bold" }
    });
};
export default openNotificationWithIcon;
// const distroy = notification.destroy();
// module.exports = notification.distroy()
// module.exports distroy;
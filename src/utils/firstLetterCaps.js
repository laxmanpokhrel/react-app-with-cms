const firstLetterCaps = (text) => {
    return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
export default firstLetterCaps;
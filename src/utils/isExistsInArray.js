const isExistInArray = (a, b) => {
    // a is an array
    // b is an item
    const keys = Object.keys(b)
    const index = a.findIndex(item => item[keys[0]] === b[keys[0]])
    if (index >= 0) return { status: true, index };
    if (index < 0) return { status: false, index };
}
export default isExistInArray;
const parseFormData = (formData) => {
    var object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return object
};
export default parseFormData
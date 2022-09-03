const viewFormData = (formData) => {
    console.log("....................Form Data.......................");
    for (var key of formData.entries()) {
        console.log(key[0] + ' - ' + key[1])
    }
    console.log("....................Form Data.......................");
    return;
};
export default viewFormData;
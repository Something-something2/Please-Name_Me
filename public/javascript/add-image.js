const expressUpload = async (e) => {

    var form = document.getElementById("fileUpload");
    var formData = new FormData(form);
    console.log("expressUpload", formData)
    const response = await fetch(`/api/image`, {
        method: 'POST',
        body: formData
    });
    window.location.reload()
}

(() => {
    document.getElementById('fileSelector').onchange = expressUpload;
})();


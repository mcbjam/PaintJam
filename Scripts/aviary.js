var featherEditor = new Aviary.Feather({
    apiKey: '9xbR7Jb6dkWk3Uyo5mSnqA',
    apiVersion: 2,
    tools: 'all',
    appendTo: '',
    onSave: function (imageID, newURL) {
        var img = document.getElementById(imageID);
        img.src = newURL;
        return false;
    },
    onError: function (errorObj) {
        alert(errorObj.message);
    }
});
function launchEditor(id, src) {
    featherEditor.launch({
        image: id,
        url: src
    });
    return false;
}




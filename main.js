
function onImageSelect() {
    var file = this.files[0],
        reader = new FileReader();

    reader.onload = function (e) {
        var dataURL = e.target.result,
            c = document.getElementById('display'),
            ctx = c.getContext('2d'),
            img = new Image();

        img.onload = function() {
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0);
            window.image = new SimpleImage(c);
        };

        img.src = dataURL;
    };

    reader.readAsDataURL(file);
}

document.getElementById("image_in").onchange = onImageSelect;
document.getElementById("image_in_btn").onclick = function () {
    // file uploads are ugly, use a button to wrap around the file upload
    document.getElementById("image_in").click();
};
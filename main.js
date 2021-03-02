var MINSIZE = 50;
var MAXSIZE = 2000;
var bgPic = new FileReader()
var hdPic = new FileReader();
var resultPic;

function upload(fileInput, target) {
    var can = fileInput.parentNode.firstChild.nextSibling;
    var out = fileInput.parentNode.lastChild.previousSibling;
    target.readAsDataURL(fileInput.files[0]);
    target.onload = function() {
        drawCanvas(target.result, can, out);
    }
}

function drawCanvas(dataUrl, canvas, output) {
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function () {
        if (checkSize(img.width, img.height, MINSIZE, MAXSIZE)) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            output.innerHTML = "Size: " + img.width + "x" + img.height; 
        }
        else {
            alert("图片过大或过小");
        }
    }
    img.src = dataUrl;
}

function checkSize(width, height, min, max) {
    if (width < min || width > max
        || height < min || height > max) {
        return false;
    }
    return true;
}

function mergeImage() {
    var canBg = document.getElementById("background");
    var canHd = document.getElementById("hide");
    var hdWidth = canHd.width;
    var hdHeight = canHd.height;
    
    var bgData = canBg.getContext("2d").getImageData(0, 0, canBg.width, canBg.height).data;
    var hdData = canHd.getContext("2d").getImageData(0, 0, hdWidth, hdHeight).data;

    var can = document.getElementById("result");
    var ctx = can.getContext("2d");
    can.width = canBg.width;
    can.height = canBg.height;
    const imageData = ctx.getImageData(0, 0, can.width, can.height);
    const imgData = imageData.data;

    for (var i = 0; i < imgData.length; i++) {
        imgData[i] = bgData[i];
    }

    var stepx = canBg.width / hdWidth;
    var stepy = canBg.height / hdHeight;

    for (var i = 0; i < hdWidth; i++){
        for (var j = 0; j < hdHeight; j++){
            var new_x = parseInt((i + 0.5) * stepx);
            var new_y = parseInt((j + 0.5) * stepy);
            var id = i + hdWidth * j;
            var new_id = new_x + canBg.width * new_y;
            imgData[4*new_id] = hdData[4*id];
            imgData[4*new_id+1] = hdData[4*id+1];
            imgData[4*new_id+2] = hdData[4*id+2];
        }
    }

    imgData[3] = parseInt(hdWidth / 256); 
    imgData[7] = hdWidth % 256;
    imgData[11] = parseInt(hdHeight / 256);
    imgData[15] = hdHeight % 256;

    ctx.putImageData(imageData,0,0);

}

function save() {

}

function clear() {

}
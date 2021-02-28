var MINSIZE = 70;
var MAXSIZE = 200;
var bgPic;
var hdPic;
var resultPic;

function changeCanvas(fileInput) {
    var can = document.getElementById("background")
    var fileId = fileInput.getAttribute("id");
    var image = readImage(fileInput);
    
    if (fileId == "bgPic") {
        bgPic = fileId;
    }
    else if (fileId == "hdPic") {
        hdPic = image;
    }
    
    if (!testImageSize(bgPic)) {
        alert("图片过大或过小，请更换图片");
    }

    var bgPic_resized = resizeImage(bgPic);

    drawTo(bgPic_resized, can);
}

function readImage(file){
    // code here
    return ;
}

function testImageSize(image) {
    var width;
    var height;
    // code to get size
    if (width < MINSIZE || width > MAXSIZE
        || height < MINSIZE || height > MAXSIZE) {
        return false;
    }
    return true;
}

function resizeImage(image) {
    // if size okay
    if (1) {
        return image;
    }

    var resized;
    // code
    return resized;
}

function mergeImage() {
    if (!checkSize(bgPic, hdPic)) {
        alert("图2过大")
    }
}

function checkImage() {
    return false;
}

function save() {
    
}
var canvas = document.getElementById("cvs");
var originImage;

function upload() {
    var filename = document.getElementById("fin");
    originImage = new SimpleImage(filename);
    originImage.drawTo(canvas);

    document.getElementById("sizeP").innerHTML = "Size: " + canvas.width + "x" + canvas.height;
}

function isImageUploaded(image){
    return image != null;
}

function grayScale() {
    if (isImageUploaded(originImage)){
        var grayImage = grayFilter(originImage);
        grayImage.drawTo(canvas);
    }
}

function grayFilter(image){
    grayImage = new SimpleImage(canvas.width, canvas.height);
    for (px of grayImage.values()){
        var oriPx = image.getPixel(px.getX(), px.getY());
        var gr = (oriPx.getRed() + oriPx.getGreen() + oriPx.getBlue()) / 3;
        px.setRed(gr);
        px.setGreen(gr);
        px.setBlue(gr);
    }
    return grayImage;
}

function hueRed(){
    if (isImageUploaded(originImage)){
        var newImage = RedFilter(originImage);
        newImage.drawTo(canvas);
    }
}

function RedFilter(image){
    var newImage = new SimpleImage(canvas.width, canvas.height);
    for (px of newImage.values()){
        var oriPx = image.getPixel(px.getX(), px.getY());
        var avg = (oriPx.getRed() + oriPx.getBlue() + oriPx.getGreen());
        if (avg < 128){
            px.setRed(2 * avg);
            px.setGreen(0);
            px.setBlue(0);
        }
        else{
            px.setRed(255);
            px.setGreen(2 * avg - 255);
            px.setBlue(2 * avg - 255);
        }
    }
    return newImage;
}

function shutter(){
    if (isImageUploaded(originImage)){
        var newImage = shutterFilter(originImage);
        newImage.drawTo(canvas);
    }
}

function shutterFilter(image){
    var newImage = new SimpleImage(canvas.width, canvas.height);
    var ht = image.height;
    var shutterWidth = ht / 10;
    for (px of newImage.values()){

        if (Math.round(px.getY() / shutterWidth) % 2 == 0){
            px.setRed(217);
            px.setGreen(140);
            px.setBlue(140);
        }
        else{
            var oriPx = image.getPixel(px.getX(), px.getY());
            px.setRed(oriPx.getRed());
            px.setGreen(oriPx.getGreen());
            px.setBlue(oriPx.getBlue());
        }
    }
    return newImage;
}

function turnBlur(){
    if (isImageUploaded(originImage)){
        var newImage = blurFilter(originImage);
        newImage.drawTo(canvas);
    }
}

function blurFilter(image){
    var poolX, poolY;
    var newImage = new SimpleImage(canvas.width, canvas.height);
    for (px of newImage.values()){
        if (Math.random() < 0.5){
            var ori = image.getPixel(px.getX(), px.getY());
        }
        else{
            var newX = px.getX() + Math.round(20 * Math.random()) - 10;
            var newY = px.getY() + Math.round(20 * Math.random()) - 10;
            if (newX < 0){newX = 0;}
            if (newY < 0){newY = 0;}
            if (newX >= image.width){newX = image.width - 1;}
            if (newY >= image.height){newY = image.height - 1;}
            var ori = image.getPixel(newX, newY);
        }
        px.setRed(ori.getRed());
        px.setGreen(ori.getGreen());
        px.setBlue(ori.getBlue());
    }
    return newImage;
}

function reset() {
    originImage.drawTo(canvas);
}

var MINSIZE = 50;
var MAXSIZE = 2000;
var bgPic = new Image();
var hdPic = new Image();
var resultPic;

function upload(fileInput, target) {
    var can = fileInput.parentNode.firstChild.nextSibling;
    // var can = document.getElementById("background");
    target.src = fileInput.files[0].name;

    target.onload = function(){
        var width = this.width;
        var height = this.height
        if (checkSize(width, height, MINSIZE, MAXSIZE)) {
            console.log(width, height);
            can.width = width;
            can.height = height;
            var ctx = can.getContext("2d");
            ctx.drawImage(this, 0, 0);
        }
    }
}

function checkSize(width, height, min, max) {
    if (width < min || width > max
        || height < min || height > max) {
        return false;
    }
    return true;
}

function makeHTMLImage(source) {
    var img = new Image();
    img.onload = function() {};
    img.src = source;
    // img.

}

function save() {

}

function clear() {

}
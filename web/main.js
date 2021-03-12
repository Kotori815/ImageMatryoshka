var MINSIZE = 50;
var MAXSIZE = 2000;

var url = "http://127.0.0.1:5000/upload";

function upload(fileInput, target) {
    var can = fileInput.parentNode.firstChild.nextSibling;
    var out = fileInput.parentNode.lastChild.previousSibling;
    var fr = new FileReader();
    fr.readAsDataURL(fileInput.files[0]);

    // draw image to correpsonding canvas with resizing
    fr.onload = function() {
        drawCanvas(fr.result, can, out);
    }
}

function drawCanvas(dataUrl, canvas, output) {
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = dataUrl;
    // rescale yhe image and draw to canvas
    // show the original size to ouput element
    img.onload = function () {
        if (checkSize(img.width, img.height, MINSIZE, MAXSIZE)) {
            var hei = 200;
            var wid = img.width / img.height * hei;
            canvas.width = wid;
            ctx.drawImage(img, 0, 0, wid, hei);
            output.innerHTML = "Size: " + img.width + "x" + img.height; 
            console.log("TYPE image loaded".replace("TYPE", canvas.id));
        }
        else {
            alert("图片过大或过小");
        }
    }
}

function checkSize(width, height, min, max) {
    return (width >= min && width <= max
            && height >= min && height <= max)
}

function generate() {
    // send back and hide image to back end
    var finBack = document.getElementById("bgPic");
    var finHide = document.getElementById("hdPic");

    var frBg = new FileReader();
    var frHd = new FileReader();
    var formJson = {"back": null, "hide": null};
    frBg.readAsDataURL(finBack.files[0]);
    frHd.readAsDataURL(finHide.files[0]);

    frBg.onload = function() {
        formJson.back = frBg.result;
    }
    
    frHd.onload = function() {
        formJson.hide = frHd.result;
        submitImg(formJson, url);
    }
}

// submit img dataurl to back end, and return the response
function submitImg(jsonForm, backUrl) {
    var canvas = document.getElementById("result");
    var output = document.getElementById("sizeRes");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: backUrl,
        contentType: "application/json",
        data: JSON.stringify(jsonForm),
        success: function(result) {
            console.log(result.result);
            $("#ImagePic").attr("src",result.result);
        }
    });    
}

function clearImg() {
    console.log("aaa")
    console.log(backImg)
}
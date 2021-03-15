var MINSIZE = 50;
var MAXSIZE = 2000;

var url = "http://127.0.0.1:5000";

function upload(fileInput, target) {
    var can = fileInput.parentNode.getElementsByTagName("canvas")[0];
    var out = fileInput.parentNode.getElementsByTagName("output")[0];
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
    frHd.readAsDataURL(finHide.files[0]);
    
    frHd.onload = function() {
        frBg.readAsDataURL(finBack.files[0]);
        formJson.hide = frHd.result;

        frBg.onload = function() {
            formJson.back = frBg.result;
            submitImg(formJson, url + "/encode");
        }
    }
}

// submit img dataurl to back end, and return the response
function submitImg(jsonForm, backUrl) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: backUrl,
        contentType: "application/json",
        data: JSON.stringify(jsonForm),
        success: function(result) {
            console.log(result.message);
            document.getElementsByTagName("img")[0].src = result.result
        }
    });    
}

function degenerate() {
    var fin = document.getElementById("resPic");

    var fr = new FileReader();
    var formJson = {"result": null};
    fr.readAsDataURL(fin.files[0]);
    
    fr.onload = function() {
        formJson.result = fr.result;
        submitImg(formJson, url + "/decode");
    }
}

function clearImg() {
    console.log("aaa")
    console.log(backImg)
}
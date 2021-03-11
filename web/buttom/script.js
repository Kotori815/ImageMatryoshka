function buttonClick1(){
    alert("芜湖");
}

function buttonClick2(){
    var res = confirm("起飞");
    if (res){
        alert("起飞成功");
    }
    else{
        alert("起飞失败");
    }
}

function changeColor(){
    var id1 = document.getElementById("div1");
    var id2 = document.getElementById("div2");

    if (id1.className == "pinkback"){
        id1.className = "blueback";
    } 
    else {
        id1.className = "pinkback";
    }
    if (id2.className == "greenback"){
        id2.className = "cyanback";
    } 
    else {
        id2.className = "greenback";
    }
}

function changeText(){
    var id1 = document.getElementById("div1");
    var id2 = document.getElementById("div2");

    if (id1.innerHTML == "Div 1 is here"){
        id1.innerHTML = "Here is div 1";
        id2.innerHTML = "Here is div 2";
    }
    else {
        id1.innerHTML = "Div 1 is here";
        id2.innerHTML = "Div 2 is here"
    }
}

function changeButtonValue(){
    var id = document.getElementById("button1");
    id.value = "abcde";
}
var Canvas = {};

Canvas.start = function () {
    Canvas.bindMenuActions();
}

Canvas.bindMenuActions = function () {
    var newBtn = document.getElementById("new");
    newBtn.addEventListener("click", Canvas.new);
    var saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", Canvas.save);
    var loadBtn = document.getElementById("load");
    loadBtn.addEventListener("click", Canvas.load);
}

Canvas.new = function () {
    var canvasName = prompt("what's the name of your painting?");
    var canvasHeight = prompt("what's the height of your painting?");
    canvasHeight = parseInt(canvasHeight) + "px";
    canvas.style.height = canvasHeight;
    var canvasWidth = prompt("what's the width of your painting?");
    canvasWidth = parseInt(canvasWidth) + "px";
    canvas.style.width = canvasWidth;
    canvas.style.backgroundColor = "white";
    var canvasTitle = document.getElementById("canvas-title");
    canvasTitle.innerHTML = canvasName;
    Canvas.show();
};

Canvas.show = function () {
    var canvas = document.getElementById("canvas");
    canvas.style.display = "block";
}

window.addEventListener('load', Canvas.start);

var trashCanvas = document.getElementById('trash');
trashCanvas.addEventListener('click', function () {
    document.getElementById('canvas').innerHTML = '';
    canvas.style.backgroundColor = "white";
})

var newColor = "rbg (000,000,000)";
var chosenColor = document.getElementById('picker').value;
document.getElementById('picker').onchange = function () {
    chosenColor = this.value;
    newColor = this.value;
}

var isSelected = 0;
var brush = document.getElementById('brush');
brush.addEventListener('click', function () {
    canvas.style.cursor = "url('./img/brush.png') 0 32, auto";
    isSelected = "brush";
})

var pencil = document.getElementById('pencil');
pencil.addEventListener('click', function () {
    canvas.style.cursor = "url('./img/pencil.png') 0 32, auto";
    isSelected = "pencil";
})

var squareO = document.getElementById('square-o');
squareO.addEventListener('click', function () {
    isSelected = "square-o";
})

var circleO = document.getElementById('circle-o');
circleO.addEventListener('click', function () {
    isSelected = "circle-o";
})

document.querySelectorAll('.colors').forEach(function (x) {
    x.addEventListener('click', function () {
        var color = getComputedStyle(x).backgroundColor;
        chosenColor = color;
    });
})


document.querySelectorAll('.colors').forEach(function (x) {
    x.addEventListener('dblclick', function () {
        x.style.backgroundColor = newColor;
        chosenColor = newColor;
    });
})

var fill = document.getElementById('fill');
fill.addEventListener('click', function () {
    canvas.style.backgroundColor = chosenColor;
})

var eraser = document.getElementById('eraser');
eraser.addEventListener('click', function () {
    canvas.style.cursor = "url('./img/eraser.png') 0 32, auto";
    chosenColor = getComputedStyle(canvas).backgroundColor;
})

var saveCanvas = document.getElementById('save');
saveCanvas.addEventListener('click', function () {
    localStorage.setItem('myCanvas', canvasWrapper.innerHTML);
})

var loadCanvas = document.getElementById('load');
loadCanvas.addEventListener('click', function () {
    canvasWrapper.innerHTML = localStorage.getItem('myCanvas', canvasWrapper.innerHTML);
})

var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', function (event) {
    if (event.buttons == 1 && isSelected != 0) {
        var newDiv = document.createElement('div');
        newDiv.className = isSelected;
        newDiv.style.backgroundColor = chosenColor;
        newDiv.style.border = "1px " + chosenColor + " solid";
        newDiv.style.top = (event.clientY - canvas.offsetTop) + "px";
        newDiv.style.left = (event.clientX - canvas.offsetLeft) + "px";
        canvas.appendChild(newDiv);
    }
});
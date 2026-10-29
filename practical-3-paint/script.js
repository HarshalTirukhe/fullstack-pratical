// =========================
// GET HTML ELEMENTS
// =========================

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const colorInput = document.getElementById("color");

const brushSizeInput = document.getElementById("brushSize");

const sizeValue = document.getElementById("sizeValue");

const clearButton = document.getElementById("clearBtn");


// =========================
// CANVAS SIZE
// =========================

function resizeCanvas() {

    const previousImage = canvas.toDataURL();

    canvas.width = canvas.clientWidth;

    canvas.height = canvas.clientHeight;

    const image = new Image();

    image.src = previousImage;

    image.onload = function () {

        ctx.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
        );

    };

}


// Set initial size

resizeCanvas();


// Resize when window changes

window.addEventListener("resize", resizeCanvas);


// =========================
// DRAWING VARIABLES
// =========================

let isDrawing = false;

let brushColor = "#000000";

let brushSize = 5;


// =========================
// CANVAS SETTINGS
// =========================

ctx.lineCap = "round";

ctx.lineJoin = "round";


// =========================
// GET MOUSE POSITION
// =========================

function getMousePosition(event) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;

    const scaleY = canvas.height / rect.height;

    return {

        x: (event.clientX - rect.left) * scaleX,

        y: (event.clientY - rect.top) * scaleY

    };

}


// =========================
// START DRAWING
// =========================

canvas.addEventListener("mousedown", function (event) {

    isDrawing = true;

    const position = getMousePosition(event);

    ctx.beginPath();

    ctx.moveTo(
        position.x,
        position.y
    );

});


// =========================
// DRAW
// =========================

canvas.addEventListener("mousemove", function (event) {

    if (!isDrawing) {
        return;
    }

    const position = getMousePosition(event);

    ctx.strokeStyle = brushColor;

    ctx.lineWidth = brushSize;

    ctx.lineTo(
        position.x,
        position.y
    );

    ctx.stroke();

});


// =========================
// STOP DRAWING
// =========================

canvas.addEventListener("mouseup", function () {

    isDrawing = false;

    ctx.closePath();

});


// If mouse leaves canvas

canvas.addEventListener("mouseleave", function () {

    isDrawing = false;

    ctx.closePath();

});


// =========================
// CHANGE COLOR
// =========================

colorInput.addEventListener("input", function () {

    brushColor = colorInput.value;

});


// =========================
// CHANGE BRUSH SIZE
// =========================

brushSizeInput.addEventListener("input", function () {

    brushSize = brushSizeInput.value;

    sizeValue.textContent = brushSize + "px";

});


// =========================
// CLEAR CANVAS
// =========================

clearButton.addEventListener("click", function () {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

});
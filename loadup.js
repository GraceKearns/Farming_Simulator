document.body.style.position="absolute"
document.body.style.left=0
document.body.style.overflowY = "hidden"
document.body.style.margin=0
document.body.style.backgroundColor = "black"
var canvas = document.createElement('canvas');
canvas.id     = "CursorLayer";
canvas.width  = 620;
canvas.height = 560;
canvas.style.zIndex   = 0;

canvas.style.position = "absolute";
canvas.style.border   = "1px solid white";
canvas.style.left   = "70px";
canvas.style.margin   = 0;
document.body.appendChild(canvas);

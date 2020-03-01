var c = [0, 0];
var ctx = [0, 0];
const padx = 20;
const adjustedWidth = c[0].width - padx;
const xscale = 30;
const yscale = 7.5/6;
var r = [1];
var bifValues = [3/5];

function loaded() {
    c[0] = document.getElementById("a");
    c[1] = document.getElementById("b");
    ctx[0] = c[0].getContext("2d");
    ctx[1] = c[1].getContext("2d");
}

function clicked() {
    // Draw background rectangle
    //r[0] = Math.random()*4;

    // Draw axis
    drawAxis(ctx[1],c[1], 5);
    //drawGraph(ctx[1], c[1]);
    setInterval(()=>{
        ctx[0].fillStyle = "#586880";
        ctx[1].fillStyle = "#586880";
        //ctx[1].fillRect(0, 0, c[1].width, c[1].height);
        ctx[0].fillRect(0, 0, c[0].width, c[0].height);
        drawAxis(ctx[0], c[0], 30);
        drawGraph(ctx[0], c[0], 30);
        //drawAxis(ctx[1],c[1], 7.5);
        plotConvergence("black", 5, r[0], ctx[1], c[1]);
        r[0]+=.0005;
        bifValues=[3/5]
    },1);
}

function drawLine(color, x, y, x1, y2, cont, c) {
    cont.beginPath();
    cont.strokeStyle = color;
    cont.moveTo(x, c.height - y);
    cont.lineTo(x1, c.height - y2);
    cont.stroke();
}

function drawText(text, x, y, cont, c) {
    cont.font = "5px Arial";
    cont.fillStyle = "black";
    cont.fillText(text, x, c.height - y);
}

function bif(r) {

    let last = bifValues[bifValues.length - 1];
    let result = r * last * (1 - last);
    bifValues.push(result);
    return result;

}

function plotConvergence(color, xscale, r, cont, c) {
    let temp = cont.lineWidth;
    cont.lineWidth = 2;
    //console.log(bifValues)
    for (i = bifValues.length-1; i > 20; i--){
        drawLineRelative(color, xscale, r, bifValues[i], r, bifValues[i]+0.001, cont, c);
    }
    //drawLineRelative(color, xscale, r, 0, r, 1, cont, c);
    cont.lineWidth = temp;
}

function drawLineRelative(color, xscale, x, y, x1, y1, cont, c) {
    const xinterval = Number.parseInt(c.width / xscale); //fix later
    const yinterval = Number.parseInt(c.height / yscale);
    drawLine(color, x * xinterval + padx, y * yinterval + padx, x1 * xinterval + padx, y1 * yinterval + padx, cont, c);
}

function drawGraph(cont, c, xscale) {
    for (x = 0; x < 30; x += 1) {
        drawLineRelative("black", xscale, x, bifValues[x], x + 1, bif(r[0]), cont, c);
    }
}

function drawAxis(cont, c, xscale) {
    const xinterval = Number.parseInt(c.width / xscale);
    const yinterval = Number.parseInt(c.height / yscale);
    // Draw axis 20 px above canvas bottom border and right of left border
    drawLine("black", padx, padx, c.width, padx, cont, c);
    drawLine("black", padx, padx, padx, c.height, cont, c);
    // Draw xAxis numbers
    for (x = padx; x < c.width; x += xinterval) {
        drawText((x - padx) / xinterval, x, padx - 10, cont, c); //10 is how many pixels below axis
    }
    for (y = padx; y < c.height; y += 30) {
        drawText((y - padx) / yinterval, padx - 10, y, cont, c); //10 is how many pixels left of axis
    }

}
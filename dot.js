var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    clickedIndex : 0,
    dots: [{x: 250, y: 300}, {x: 350, y: 400}, {x: 500, y: 200}, {x: 1000, y: 550}, {x: 400, y: 600}, {x: 600, y: 300}],
    dotOrder: [0,1,2,3,4,5],
    dotIndex: 0
};

function circleCollision (c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if ( a > Math.sqrt( (x*x) + (y*y) ) ) return true;
    else return false;
}

function prepCanvas () {
    var res = window.devicePixelRatio || 1,
        scale = 1 / res;
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');
    
    data.canvas.width = window.innerWidth * res;
    data.canvas.height = window.innerHeight * res;
    data.canvas.style.width = window.innerWidth + 'px';
    data.canvas.style.height = window.innerHeight + 'px';
    
    data.ctx.scale(res, res);
    
    data.canvas.addEventListener('mousedown', function (e) {
        checkForDot(e);
    });
}

function drawDots () {
    var i = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(d.x, d.y, 10, 0, 2*Math.PI);
        data.ctx.fillStyle = 'black';
        data.ctx.fill();
        data.ctx.closePath();
    }
}

function isValidConnection(dot1, dot2) {
    //If we already have connected all the dots we cant continue
    if(data.dotIndex >= data.dotOrder.length) {
        return false;
    }
    //Are the two dots equivalent to the dot currently in order and the next dot in order respectively?
    if(data.dotOrder[data.dotIndex] == dot1 && data.dotOrder[data.dotIndex + 1] == dot2) {
        return true;
    }
    //If not, return false
    return false
}

function drawLine (toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(data.clickedDot.x, data.clickedDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    data.ctx.lineWidth = 3;
    data.ctx.strokeStyle = 'black';
    data.ctx.stroke();
    data.ctx.closePath();
}

//Reset selection,
function reset() {
    console.log("reset")
    data.clickedDot = null;
    data.clickedIndex = null;
}

function checkForDot (e) {
    var i = 0, col = null, index = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i],
            c1 = {x: d.x, y: d.y, r: 10},
            c2 = {x: e.pageX, y: e.pageY, r: 10};
            index = i
        if (circleCollision(c1, c2)) {
            col = d;
            index = i;
            //You actually can stop after you have found the first dot index! ^^
            break;
        } 
    }
    if (col !== null) {
        if (data.clickedDot !== null && isValidConnection(data.clickedIndex, index)) {
            //After we have successfully found a valid line combination we can increment the dot-index (so the index inside our current order)
            data.dotIndex = data.dotIndex + 1;
            console.log("success, incrementing clicked index to " + data.clickedIndex)
            drawLine(col, index);
            //reset(); //change this if you really want continoous clicking
            console.log(data.clickedIndex)
        }
        data.clickedDot = col;
        data.clickedIndex = index;

    } else {
        reset();
    }
}

prepCanvas();
drawDots();













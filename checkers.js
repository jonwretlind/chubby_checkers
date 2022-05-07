// declare the object variables for the checkerboard
const square = document.createElement('div');
const board = document.getElementById('Board');
const screenX = document.documentElement.clientWidth;

//declare the square size
let size = 50;
// screen vertical position of the board
let scrY = 100;

// set initial styles for the squares
Object.assign(square.style, {
    position: "absolute",
    width: size + "px",
    height: size + "px",
    border: "1px solid black"
});

//declare the board size
let boardSize = size * 8;

for (var i = 0; i < boardSize; i += size) {
    square.style.top = i + scrY + "px";
    var idx = i / size;
    for (var j = 0; j < boardSize; j += size) {
        var jdx = j / size;
        if (jdx % 2 == 0) {
            if (idx % 2 == 0) {
                square.style.backgroundColor = "red";
            } else {
                square.style.backgroundColor = "black";
            }
        } else {
            if (idx % 2 == 0) {
                square.style.backgroundColor = "black";
            } else {
                square.style.backgroundColor = "red";
            }
        };
        square.style.left = j + (screenX / 2 - boardSize / 2) + "px";
        board.innerHTML += square.outerHTML;
    };
};
//SET GLOBAL VARIABLES
const SQUARE = document.createElement('div');
const PIECE = document.createElement('i'); // use i for pieces
const BOARD = document.getElementById('Board');
const CONTAINER = document.getElementsByClassName('container');
const BASE = document.getElementsByClassName('game-base');
let size = 50,
    scrY = CONTAINER[0].offsetHeight,
    scrX = CONTAINER[0].offsetWidth,
    boardSize = size * 8,
    baseWidth = boardSize,
    leftPos = scrX / 2 - boardSize / 2,
    Pieces = [];

//LISTENERS
window.addEventListener("onresize", drawBoard);

// DRAW BOARD
function drawBoard() {
    console.log("Draw Board");

    //SET STYLES FOR BOARD
    Object.assign(SQUARE.style, {
        position: "absolute",
        width: size + "px",
        height: size + "px",
        border: "1px solid black"
    });

    Object.assign(BOARD.style, {
        position: "absolute",
        width: boardSize + "px",
        height: boardSize + "px",
        marginTop: "-1px",
        transformStyle: "preserve-3d",
        transform: "rotateX(-110deg) rotateY(0deg) translateY(-650px)"
    });

    Object.assign(BASE[0].style, {
        position: "relative",
        backgroundColor: "black",
        height: "1em",
        width: 2 - baseWidth + "px",
        left: 1 + leftPos + "px",
        transform: "rotateX(100deg) translateY(-71px) translateZ(-432px)"
    });

    SQUARE.classList.add(`y_0`);
    for (var i = 0; i < boardSize; i += size) {
        SQUARE.style.top = i + scrY + "px";
        var idx = i / size;
        SQUARE.classList.add(`x_0`);
        SQUARE.classList.remove(`x_8`); //clean up extra classes  at end of loop

        for (var j = 0; j < boardSize; j += size) {
            var jdx = j / size;

            if (jdx % 2 == 0) {
                if (idx % 2 == 0) {
                    SQUARE.style.backgroundColor = "red";
                } else {
                    SQUARE.style.backgroundColor = "black";
                }
            } else {
                if (idx % 2 == 0) {
                    SQUARE.style.backgroundColor = "black";
                } else {
                    SQUARE.style.backgroundColor = "red";
                }
            }

            SQUARE.classList.replace(`x_${jdx}`, `x_${jdx + 1}`);
            SQUARE.style.left = j + leftPos + "px";
            BOARD.innerHTML += SQUARE.outerHTML;
        };//endfor j

        SQUARE.classList.replace(`y_${idx}`, `y_${idx + 1}`);
    };// endfor i
}; // drawBoard

//  RESET PIECES
function resetGame() {
    // "1" = red
    // "2" = black
    // "3" = red king
    // "4" = black king
    Pieces = [
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 2, 0, 2, 0, 2, 0, 2,
        2, 0, 2, 0, 2, 0, 2, 0,
        0, 2, 0, 2, 0, 2, 0, 2
    ];
    PIECE.classList.add("y_0");
    for (var y = 0; y < 8; y++) {
        var clY = "y_" + y;

        for (var x = 0; x < 8; x++) {
            var pos = x * y;
            var clX = "x_" + x;
            PIECE.classList.add("x_0");
            PIECE.classList.remove("x_8"); //clean up extra classes  at end of loop

            switch (Pieces[pos].value) {
                case 1:
                    drawPiece("red", clX, clY, x, y);
                    break;
                case 2:
                    drawPiece("black", clX, clY, x, y);
                    break;
                case 3:
                    //red king
                    drawPiece("red", clX, clY, x, y);
                    break;
                case 4:
                    //black king
                    drawPiece("black", clX, clY, x, y);
                    break;
                default:
                    // transparent used for spaces & targets
                    drawPiece("transparent", clX, clY, x, y);
            };
            PIECE.classList.replace('x_${x}', 'x_${x+1}');
            BOARD.innerHTML += PIECE.outerHTML;
        };
        PIECE.classList.replace('y_${y}', 'y_${y+1}');
    };
};//resetGame


function drawPiece(color, clX, clY, x, y) {
    PIECE.classList.add(clX, clY);
    if (color == "transparent") PIECE.classList.add('space');
    Object.assign(PIECE.style, {
        width: size + "px",
        height: size + "px",
        left: Number((x * size) + leftPos) + "px",
        top: Number((y * size) + scrY) + "px",
        color: color,
    });
};// drawPiece

//INIT
drawBoard();
resetGame();
main();

//MAIN GAME LOOP
function main() {
    console.log("Game Started");
};// main
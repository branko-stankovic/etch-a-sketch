const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');

function drawGrid(size) {
    for (let i = 0; i < size; i++) {
        console.log("DRAWING");
    }
}

gridSize.addEventListener('input', function() {
    console.log(gridSize.value);
});

window.onload = function() {
    drawGrid(gridSize.value);
}
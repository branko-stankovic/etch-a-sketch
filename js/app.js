const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');

function clearGrid(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function drawGrid(size) {
    // BUT FIRST
    clearGrid(drawingBoard);

    // now draw
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        drawingBoard.appendChild(row);

        for (let j = 0; j < size; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        }
    }
}

gridSize.addEventListener('input', function() {
    // console.log(gridSize.value);
});

window.onload = function() {
    drawGrid(gridSize.value);
}
const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');

function deleteGrid(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function createGrid(size) {
    // BUT FIRST
    deleteGrid(drawingBoard);

    // now draw
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        drawingBoard.appendChild(row);

        for (let j = 0; j < size; j++) {
            let gridCell = document.createElement('div');
            gridCell.classList.add('gridCell');
            let cellIndex = (i * gridSize.value) + j;
            gridCell.setAttribute('data-index', cellIndex);
            row.appendChild(gridCell);
        }
    }
}

gridSize.addEventListener('input', function() {
    // limit max grid size
    if (gridSize.value <= 100) {
        createGrid(gridSize.value);
    } else {
        gridSize.value = 100;
    }
    
});

window.onload = function() {
    createGrid(gridSize.value);
}
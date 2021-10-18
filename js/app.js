const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');
const clearGrid = document.getElementById('clearGrid');
const drawModeOptions = document.querySelectorAll('.drawModeOptions button');

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

const drawModes = {
    rainbow: function drawRandomColor() {
        let random = Math.floor(Math.random() * 360);
        return `hsl(${random}, 100%, 50%)`;
    },
    black: function drawBlackColor() {
        return 'black';
    },
    erase: function eraseColor() {
        return '';
    }
}

let chosenDrawMode = drawModes.rainbow;

gridSize.addEventListener('input', function() {
    // limit max grid size
    if (gridSize.value <= 100) {
        createGrid(gridSize.value);
    } else {
        gridSize.value = 100;
    }
    
});

drawingBoard.addEventListener('mouseover', function(e) {
    e.target.style.backgroundColor = chosenDrawMode();
});

clearGrid.addEventListener('click', () => createGrid(gridSize.value));

drawModeOptions.forEach(option => option.addEventListener('click', function(e) {
    chosenDrawMode = drawModes[e.target.value];
}));

window.onload = function() {
    createGrid(gridSize.value);
}
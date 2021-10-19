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
            gridCell.setAttribute('data-gradient', 0);
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
    gradient: (e) => {
        let currentOpacity = e.target.dataset.gradient;
        currentOpacity++;
        e.target.dataset.gradient++;

        return `rgba(0,0,0,${currentOpacity / 10})`;
    },
    erase: function eraseColor(e) {
        e.target.dataset.gradient = 0;
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
    e.target.style.backgroundColor = chosenDrawMode(e);
});

clearGrid.addEventListener('click', () => createGrid(gridSize.value));

drawModeOptions.forEach(option => option.addEventListener('click', function(e) {
    chosenDrawMode = drawModes[e.target.value];
    drawModeOptions.forEach(button => {
        button.classList.remove('active');
    });
    this.classList.add('active');
}));

document.addEventListener('keydown', function(e) {
    let key = e.key.toLowerCase();

    if (key == "+") {
        gridSize.value++;
        createGrid(gridSize.value);
    } else if (key == "-") {
        gridSize.value--;
        createGrid(gridSize.value);
    }
});

window.onload = function() {
    createGrid(gridSize.value);
}
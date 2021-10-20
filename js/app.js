const drawingBoard = document.getElementById('container');
const gridSize = document.getElementById('gridSize');
const clearGrid = document.getElementById('clearGrid');
const drawModeOptions = document.querySelectorAll('.drawModeOptions button');

const drawModes = {
    rainbow: function drawRandomColor() {
        let random = Math.floor(Math.random() * 360);
        return `hsl(${random}, 100%, 50%)`;
    },

    black: function drawBlackColor() {
        return 'black';
    },

    gradient: (cell) => {
        // limit max gradient level
        if (cell.dataset.gradient < 10) {
            cell.dataset.gradient++;
        }
        // data-gradient is 10x opacity because 
        // js 0.1 + 0.2 sometimes != 0.3
        return `rgba(0,0,0,${cell.dataset.gradient / 10})`;
    },

    erase: function eraseColor(cell) {
        cell.dataset.gradient = 0;
        return '';
    }
}

// default drawing mode
let chosenDrawMode = drawModes.rainbow;

function deleteGrid(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function createGrid(size) {
    // BUT FIRST
    deleteGrid(drawingBoard);

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        drawingBoard.appendChild(row);

        for (let j = 0; j < size; j++) {
            let gridCell = document.createElement('div');
            gridCell.classList.add('gridCell');
            gridCell.setAttribute('data-gradient', 0);
            row.appendChild(gridCell);
        }
    }
}

gridSize.addEventListener('input', function() {
    // limit lower bound
    if (gridSize.value < 0) {
        gridSize.value = 1;
    }

    // and upper bound
    if (gridSize.value <= 100) {
        createGrid(gridSize.value);
    } else {
        gridSize.value = 100;
    }
    
});

drawingBoard.addEventListener('mouseover', function(e) {
    e.target.style.backgroundColor = chosenDrawMode(e.target);
});

clearGrid.addEventListener('click', () => createGrid(gridSize.value));

drawModeOptions.forEach(option => option.addEventListener('click', function(e) {
    chosenDrawMode = drawModes[e.target.value];

    // change active menu button
    drawModeOptions.forEach(button => {
        button.classList.remove('active');
    });
    this.classList.add('active');
}));

document.addEventListener('keydown', function(e) {
    if (e.key == "+") {
        gridSize.value++;
        createGrid(gridSize.value);
    } else if (e.key == "-") {
        gridSize.value--;
        createGrid(gridSize.value);
    }
});

window.onload = function() {
    createGrid(gridSize.value);
}
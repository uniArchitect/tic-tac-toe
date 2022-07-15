// Create HTML components
const gamePage = (() => {
    // Create container div
    const container = document.createElement('div');
    document.body.appendChild(container).className = 'container';

    // Create Game Board
    const gameBoard = document.createElement('div');
    container.appendChild(gameBoard).className = 'game-board';

    // Divide Game Board into 9 square grid
    defineBoard = (rows, cols) => {
        gameBoard.style.setProperty('--grid-rows', rows);
        gameBoard.style.setProperty('--grid-cols', cols);
        for(i = 0; i < (rows * cols); i++) {
            let gameSquare = document.createElement('div');
            gameBoard.appendChild(gameSquare).className = "game-square";
        }
    }

    defineBoard(3, 3);

    return {container, gameBoard, defineBoard};
})();

// Compose - Player Action

const gameAction = (() => {
    const circleMove = document.querySelector('.game-square').addEventListener('click', (e) => {
        console.log(e.target);
        const circle = document.createElement('div').innerHTML = 'O';
        gameSquare.appendChild(circle).className = 'circle';
    })

    return {circleMove};

})();

// Compose - Check Winner
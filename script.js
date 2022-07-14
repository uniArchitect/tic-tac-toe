// Create HTML components
const gamePage = (() => {
    // Create container div
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    // Create Game Board
    const gameBoard = document.createElement('div');
    container.appendChild(gameBoard).className = 'game-board';

    // Divide Game Board into 9 square grid
    defineBoard = (rows, cols) => {
        gameBoard.style.setProperty('--grid-rows', rows);
        gameBoard.style.setProperty('--grid-cols', rows);
        for(i = 0; i < (rows * cols); i++) {
            let gameSquare = document.createElement('div');
            gameBoard.appendChild(gameSquare).className = "game-square";
        }
    }

    defineBoard(3, 3);

    return {container, gameBoard};
})();
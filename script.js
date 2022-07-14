// Create HTML components
const gamePage = (() => {
    // Create container div
    const container = document.createElement('div');

    container.classList.add('container');

    document.body.appendChild(container);

    // Create Game Board
    const gameBoard = document.createElement('div');

    gameBoard.classList.add('game-board');

    container.appendChild(gameBoard);

    return {container, gameBoard};
})();
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
    let gameSquare = document.querySelector('.game-square');
    const circle = document.createElement('div')
    circle.innerHTML = `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>
    `
    const cross = document.createElement('div').innerHTML = 'X';

    changeMark = (element) => {
        element.appendChild(circle).className = 'circle-mark';
    }
    
    const circleMove = document.querySelector('.game-board').addEventListener('click', (e) => {
        // console.log(e.target);
        changeMark(e.target);
    })
    
    return {circleMove, gameSquare, circle, cross, changeMark}
})();

// Compose - Check Winner
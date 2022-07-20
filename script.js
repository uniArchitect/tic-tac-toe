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
            gameSquare.setAttribute('id', 'open-square')
            gameBoard.appendChild(gameSquare).className = "game-square";
        }
    }
    defineBoard(3, 3);

    return {container, gameBoard};
})();

// Compose - Player Action

const gameAction = (() => { 
    // querySelectorAll class: game-square put all game-square divs into an array NodeList
    const gameSquare = document.querySelectorAll('.game-square');
    const squareArray = [...gameSquare];
    let crossMove
    let currentID

    // Winning Combinations
    const winningCombos = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]

    // Event: Make a move 'O' or 'X'
    changeMark = (element, currentMove, currentID) => {
        element.setAttribute('id', currentID);
        element.appendChild(currentMove);
        // console.log(currentID);
    }

    // Event: Click Action
    clickAction = (e) => {
        // console.log(e.target);
            // Define X Node
            const cross = document.createElement('div')
            cross.classList.add('cross')
            // cross.setAttribute('id', 'cross')
            cross.innerHTML = `
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
            `
            // Define Circle Node
            const circle = document.createElement('div')
            circle.classList.add('circle')
            // circle.setAttribute('id', 'circle')
            circle.innerHTML = `
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            `
            // Decides which move is up next (crossMove by default is undefined)
            const currentMove = crossMove ? circle : cross;
            const currentID = crossMove ? 'circle' : 'cross';
            // Make a move 'O' or 'X'
            changeMark(e.target, currentMove, currentID);

            // Enables the ternary operator (? :) in currentMove to switch conditions
            swapTurns();

            // Works because testWinner returns 'boolean' value true
            if (testWinner(currentID) == true && currentID == 'circle') {
                console.log('O Wins')
                // resetGame(squareArray)
            } else if (testWinner(currentID) == true && currentID == 'cross') {
                console.log('X Wins')
                // resetGame(squareArray)
            } else if (testDraw() == true) {
                console.log('Draw!')
            }
    }

    // Event: Changes mark for empty div
    gameSquare.forEach(gameSquare => {
        gameSquare.addEventListener('click', clickAction, {once:true});
    })

    // Event: Alternate mark every turn
    // Enables the ternary operator (? :) in currentMove to switch conditions
    swapTurns = () => {
        crossMove = !crossMove
    }

    testWinner = (currentID) => {
        // 'winningCombos' is multidimensional array with all win combos
        const comboMatches = winningCombos.some((combination) => {
            // 'combination' is any individual array in winningCombos
            return combination.every((index) => {
                // 'index' is each number in that array => has an ID of 'cross' or 'circle'
                return gameSquare[index].id.includes(currentID)
            });
        })
        // return the 'boolean' (true / false) value of comboMatches
        return comboMatches
        // console.log(typeof comboMatches, comboMatches);
    }

    testDraw = () => {
        // 'index' is each node in squareArray
        return squareArray.every(index => {
            return index.hasChildNodes()
        })
    }

    function resetGame() {
        // prompt('Do you want to play again?')
        startPage()
        // BUG: Cannot clear if an empty node is present
        // for (i = 0; i <= squareArray.length; i++) {
        //     squareArray[i].setAttribute('id', 'open-square');
        //     squareArray[i].removeChild(squareArray[i].firstChild);
        // }
    }

    return {gameSquare, currentID, crossMove, winningCombos, squareArray}
})();
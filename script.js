// Compose - Players 1 & 2
const gamePlayers = (() => {
    // Create Game Menu container
    const playerContainer = document.createElement('div');
    document.body.appendChild(playerContainer).className = 'selection-container';

    // Create Game Menu buttons
    const startGameBtn = document.createElement('button');
    startGameBtn.innerText = 'Play Tic-Tac-Toe';
    playerContainer.appendChild(startGameBtn).className = 'start-btn';

    // Create Game Menu fields
    const playerMenu = document.createElement('aside');
    const playerForm = document.createElement('form');
    const playerFormList = document.createElement('ul');
    const playerListItemOne = document.createElement('li');
    const playerListItemTwo = document.createElement('li');
    const listLabelOne = document.createElement('label');
    const listInputOne = document.createElement('input');
    const listLabelTwo = document.createElement('label');
    const listInputTwo = document.createElement('input');
    const playerFormSubmit = document.createElement('input');
    playerContainer.appendChild(playerMenu).className = 'player-menu';

    // Create Form
    playerMenu.appendChild(playerForm).className = 'player-form';
    playerForm.setAttribute('action', 'index.html');
    playerForm.setAttribute('method', 'GET');
    playerForm.appendChild(playerFormList);

    // Create Player Inputs
    playerFormList.appendChild(playerListItemOne);
    listLabelOne.setAttribute('for', 'name');
    listLabelOne.innerText = 'Player One'
    playerListItemOne.appendChild(listLabelOne);
    listInputOne.setAttribute('type', 'text');
    listInputOne.setAttribute('id', 'player-one-name');
    playerListItemOne.appendChild(listInputOne);

    playerFormList.appendChild(playerListItemTwo);
    listLabelTwo.setAttribute('for', 'name');
    listLabelTwo.innerText = 'Player Two'
    playerListItemTwo.appendChild(listLabelTwo);
    listInputTwo.setAttribute('type', 'text');
    listInputTwo.setAttribute('id', 'player-two-name');
    playerListItemTwo.appendChild(listInputTwo);

    // Create Submit
    playerFormList.appendChild(playerFormSubmit);
    playerFormSubmit.setAttribute('type', 'submit')

    // Event: Add Player HTML elements
    const playerOne = document.createElement('div')
    const playerTwo = document.createElement('div')
    playerContainer.appendChild(playerOne).className = 'player-one';
    playerContainer.appendChild(playerTwo).className = 'player-two';
    // Record Player Names to variables

    document.querySelector('.player-form').addEventListener('submit', (e) => {
    
        e.preventDefault();
    
        // Recording form values
        const playerOneName = document.querySelector('#player-one').value;
        const playerTwoName = document.querySelector('#player-two').value;

        // Create Player Scoreboard with named variables
    })

    return {playerContainer};
})();

// Create Game Board Vomponents
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

    const restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play Again?'

    return {container, gameBoard, restartBtn};
})();

// Compose - Player Action
const gameAction = (() => { 
    // querySelectorAll class: game-square put all game-square divs into an array NodeList
    const gameSquare = document.querySelectorAll('.game-square');
    const squareArray = [...gameSquare];
    let crossMove = false;
    let currentID = false;

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
                endGame()
            } else if (testWinner(currentID) == true && currentID == 'cross') {
                console.log('X Wins')
                endGame()
            } else if (testDraw() == true) {
                console.log('Draw!')
                endGame()
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

    // Event: Winner has been decided
    endGame = () => {
        gamePage.container.appendChild(gamePage.restartBtn).className = 'restart'
        // prompt('Do you want to play again?')
    }

    // BUG: gameStart allows resetting of click events, but board is not cleared (Need child elements erased and id reset)
    // gameSquare is a NodeList and cannot use .setAttribute syntax
    // BUG: for loop to clear the board doesn't allow resetting click event
    gameStart = () => {
        gameSquare.forEach((index) => {
            index.setAttribute('id', 'open-square');
            index.innerHTML="";
        });

        // function resetSquares(index) {
        //     index.setAttribute('id', 'open-square');
        //     index.innerHTML="";
        // }
        
        // for (i = 0; i <= gameSquare.length; i++) {
        //     gameSquare[i].setAttribute('id', 'open-square');
        //     gameSquare[i].innerHTML=""
        // }

        gameSquare.forEach(gameSquare => {
            gameSquare.addEventListener('click', clickAction, {once:true});
        })    
        // Removes 'Play Again' button
        gamePage.container.removeChild(gamePage.restartBtn);
    }

    gamePage.restartBtn.addEventListener('click', gameStart);

    return {gameSquare, currentID, crossMove, winningCombos, squareArray}
})();
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
    // querySelectorAll class: game-square put all game-square divs into an array NodeList
    const gameSquare = document.querySelectorAll('.game-square');
    // Set up 2 arrays for both players
    let circleArray = [];
    let crossArray = [];
    let crossMove
    const currentSymbol = crossMove ? 'circle' : 'cross';

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
    changeMark = (element, currentMove) => {
        element.setAttribute('id', currentSymbol);
        element.appendChild(currentMove);
    }

    // Event: Changes mark for empty div
    gameSquare.forEach(gameSquare => {
        gameSquare.addEventListener('click', (e) => {
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
            // Make a move 'O' or 'X'
            changeMark(e.target, currentMove);
            
            // Assign index value here as currentMove swaps
            if(currentMove == cross) {
                assignCrossIndex(gameSquare);
            } else {
                assignCircleIndex(gameSquare);
            };

            // Enables the ternary operator (? :) in currentMove to switch conditions
            swapTurns();

            if (testWinner(currentSymbol) === 'false') {
                console.log('win')
            }
            

            // once:true limits EventListener click to be run only once in each instance
        }, {once:true});
    })

    // Event: Alternate mark every turn
    // Enables the ternary operator (? :) in currentMove to switch conditions
    swapTurns = () => {
        crossMove = !crossMove
    }

    // Assign index to an array for each player
    assignCircleIndex = (gameSquare) => {
        const index = [...gameSquare.parentElement.children].indexOf(gameSquare);
        console.log(index);
        circleArray.push(index);
        return circleArray
    }

    testWinner = (currentSymbol) => {
        // winningCombos is multidimensional array with all win combos
        const comboMatches = winningCombos.some((combination) => {
            // combination is any individual array in winningCombos
            return combination.every((index) => {
                // index is each number in that array => has a childElement 'cross' or 'circle'
                return gameSquare[index].id.includes(currentSymbol)
                // if(gameSquare[index].hasChildNodes() == 'true') {
                //     return gameSquare[index].firstChild.classList.contains();
                // } else return
            });
        })

        // Lengthy array functions
        // const comboMatches = winningCombos.some(checkWinningCombos(arg));

        // function checkWinningCombos(arg) {
        //     return arg.every(checkGameSquares(index))
        // }

        // function checkGameSquares(index) {
        //     if(gameSquare[index].hasChildNodes() == 'true') {
        //         return gameSquare[index].firstChild.classList.contains('circle');
        //     } else return
        // }

        console.log(comboMatches);
    }

    assignCrossIndex = (gameSquare) => {
        const index = [...gameSquare.parentElement.children].indexOf(gameSquare);
        console.log(index);
        crossArray.push(index);
        return crossArray
    }

    // Check for winning combination
    // checkWinner = (winningCombos) => {
    //     if(circleArray.includes(winningCombos) == 'true') {
    //         console.log('O Wins!')
    //     } else if (crossArray.includes(winningCombos) == 'true') {
    //         console.log('X Wins')
    //     }
    // }

    // function checkWinner(currentMove) {
    //     return winningCombos.some(combinations => {
    //         return combinations.every(index => {
    //             return gameSquare[index].classList.contains(currentMove)
    //         })
    //     })
    // }    

    return {gameSquare, circleArray, crossArray, winningCombos,}
})();

// Compose - Check Winner
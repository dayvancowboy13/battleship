import Ship from './modules/Ship.js';
import Gameboard from './modules/Gameboard.js';
import Player from './modules/Player.js';
import DOMFunctions from './modules/DOMFunctions.js';
import './style.css';

console.log('Begin!');

initListeners();

// Setup game /////
const p1 = new Player('human');
const p2 = new Player('computer');

const startingCoords = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0]
];

const shipNames = [
    'carrier',
    'battleship',
    'destroyer',
    'submarine',
    'patrolBoat'
];

setPlayerBoards(p1);
setPlayerBoards(p2);

DOMFunctions.renderBoard('player', p1.gameBoard.boardArray);
DOMFunctions.renderBoard('enemy', p2.gameBoard.boardArray);

document.dispatchEvent(new CustomEvent('begin-player-turn', {
    bubbles: true,
    detail: {
        message: 'players have been created; array things created; boards set and rendered'
    }
}));
// ///////////////////////

function initListeners() {


    document.addEventListener('begin-player-turn', playerTurn);

    document.addEventListener('game-over', gameOver);

    document.addEventListener('begin-enemy-turn', enemyTurn);

    document.addEventListener('keypress', (e) => {

        if (e.key === 'p') {

            p1.gameBoard.printBoard();
            p2.gameBoard.printBoard();

        }

    });

}

function gameOver(e) {

    console.log('game-over event caught, ending game');
    alert(`Game Over! ${e.detail.winner} wins!`);
    if (e.detail.winner === 'player') DOMFunctions.changeTurnLabel('You Win!');
    else DOMFunctions.changeTurnLabel('You Lose!');
    document.removeEventListener('click', clickEnemyBoard);
    document.removeEventListener('begin-player-turn', playerTurn);
    document.removeEventListener('begin-enemy-turn', enemyTurn);

}

function playerTurn() {

    console.log('changing to player turn');
    DOMFunctions.changeTurnLabel('Your Turn');
    document.addEventListener('click', clickEnemyBoard);

}

function enemyTurn() {

    console.log('changing to enemy turn');
    DOMFunctions.changeTurnLabel('Enemy\'s Turn');
    document.removeEventListener('click', clickEnemyBoard);
    // enemy move:
    // get two random numbers from 0-9
    // if that square has already been hit, redo it
    console.log('simulating enemy turn');

    // random interval between 1-7 seconds for enemy to delay
    // let enemyTurnDelay = Math.random() * 6000 + 1000;
    let enemyTurnDelay = 100;
    console.log(`Enemy turn delay: ${enemyTurnDelay}`);
    setTimeout(() => {

        let randomRow;
        let randomCol;
        do {

            randomRow = Math.floor(Math.random() * 10);
            randomCol = Math.floor(Math.random() * 10);

            console.log(`row: ${randomRow}; col: ${randomCol}`);

        } while (p1.gameBoard.boardArray[randomRow][randomCol].isHit);

        p1.gameBoard.receiveAttack([randomRow, randomCol]);

        DOMFunctions.renderBoard('player', p1.gameBoard.boardArray);

        if (p1.gameBoard.allShipsSunk()) {

            this.dispatchEvent(new CustomEvent('game-over', {
                bubbles: true,
                detail: { winner: 'Computer Player' }
            }));

        } else {

            this.dispatchEvent(new CustomEvent('begin-player-turn', {
                bubbles: true,
                detail: 'game not over'
            }));

        }

    }, enemyTurnDelay);

}

function clickEnemyBoard(e) {

    if (e.target.dataset.owner === 'enemy') {

        let x = +e.target.dataset.row;
        let y = +e.target.dataset.col;

        console.log(`${x} ${y}`);
        if (!p2.gameBoard.boardArray[x][y].isHit) {

            p2.gameBoard.receiveAttack([x, y]);

            DOMFunctions.renderBoard('enemy', p2.gameBoard.boardArray);


            if (p2.gameBoard.allShipsSunk()) {

                console.log('all enemy ships sunk!');
                this.dispatchEvent(new CustomEvent('game-over', {
                    bubbles: true,
                    detail: { winner: 'player' }
                }));

            }

            // console.log('still reachable?');

            this.dispatchEvent(new CustomEvent('begin-enemy-turn', {
                bubbles: true,
                detail: 'game not over'
            }));

        }

    }

}


function setPlayerBoards(player) {

    for (let i = 0; i < startingCoords.length; i++) {

        player.gameBoard.placeShip(
            shipNames[i], '-', startingCoords[i]
        );

    }

}
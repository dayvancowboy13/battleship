import Ship from './modules/Ship.js';
import Gameboard from './modules/Gameboard.js';
import Player from './modules/Player.js';
import DOMFunctions from './modules/DOMFunctions.js';
import './style.css';

console.log('Begin!');

initListeners();


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


// Approach: setup event listeners for the end of each "phase"?

// Setup complete -- Now player's turn
// comprised of:
// 1). changing the HTML to indicate Player's turn
// 2). activating the listener for the player clicking on the enemy board
// Player's turn over; now enemy's turn

// Player turn start:
// DOMFunctions.updatePlayerTurnHTML('human')

function initListeners() {


    document.addEventListener('begin-player-turn', function (e) {

        console.log('changing to player turn');
        document.addEventListener('click', clickEnemyBoard);

    });

    document.addEventListener('game-over', function (e) {

        alert(`${e.detail.winner} is the winner!`);


    });

    document.addEventListener('begin-enemy-turn', function (e) {

        console.log('changing to enemy turn');
        document.removeEventListener('click', clickEnemyBoard);
        setTimeout(() => {

            console.log('simulating enemy turn');
            this.dispatchEvent(new CustomEvent('begin-player-turn', {
                bubbles: true,
                detail: 'game not over'
            }));

        }, 5000);


    });

    document.addEventListener('end-enemy-turn', function (e) {

        console.log('changing to player turn');
        document.addEventListener('click', clickEnemyBoard);


    });

    document.addEventListener('keypress', (e) => {

        if (e.key === 'p') {

            p1.gameBoard.printBoard();
            p2.gameBoard.printBoard();

        }

    });

    document.addEventListener('keypress', (e) => {

        if (e.key === 'e') {


        }

    });

}


function clickEnemyBoard(e) {

    if (e.target.dataset.owner === 'enemy') {

        let x = +e.target.dataset.row;
        let y = +e.target.dataset.col;

        console.log(`${x} ${y}`);
        p2.gameBoard.receiveAttack([x, y]);
        DOMFunctions.renderBoard('enemy', p2.gameBoard.boardArray);

        if (p2.gameBoard.allShipsSunk()) {

            this.dispatchEvent(new CustomEvent('game-over', {
                bubbles: true,
                detail: { winner: 'Player 1' }
            }));

        }

        // console.log('still reachable?');

        this.dispatchEvent(new CustomEvent('begin-enemy-turn', {
            bubbles: true,
            detail: 'game not over'
        }));

    }

}


function setPlayerBoards(player) {

    for (let i = 0; i < startingCoords.length; i++) {

        player.gameBoard.placeShip(
            shipNames[i], '-', startingCoords[i]
        );

    }

}
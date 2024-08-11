import Ship from './modules/Ship.js';
import Gameboard from './modules/Gameboard.js';
import Player from './modules/Player.js';
import DOMFunctions from './modules/DOMFunctions.js';
import './style.css';

console.log('Begin!');

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

// p1.gameBoard.printBoard();
// p2.gameBoard.printBoard();

DOMFunctions.renderBoard('player', p1.gameBoard.boardArray);
DOMFunctions.renderBoard('opponent', p2.gameBoard.boardArray);

document.addEventListener('click', (e) => {

    if (e.target.dataset.owner === 'opponent') {

        let x = +e.target.dataset.row;
        let y = +e.target.dataset.col;

        console.log(`${x} ${y}`);
        p2.gameBoard.receiveAttack([x, y]);
        DOMFunctions.renderBoard('opponent', p2.gameBoard.boardArray);

    }

});

document.addEventListener('keypress', (e) => {

    if (e.key === 'p') {

        p1.gameBoard.printBoard();
        p2.gameBoard.printBoard();

    }

});


function setPlayerBoards(player) {

    for (let i = 0; i < startingCoords.length; i++) {

        player.gameBoard.placeShip(
            shipNames[i], '-', startingCoords[i]
        );

    }

}
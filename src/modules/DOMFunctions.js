import Gameboard from './Gameboard';

export default class DOMFunctions {

    static {

        console.log('DOMFunctions class loaded');

    }

    static renderBoard(player, board) {

        const boardDiv = document.querySelector(`#${player}-board`);
        boardDiv.innerHTML = '';

        // hasShip: false,
        // isHit: false,
        // shipType: null

        // generate grid-cells
        for (let i = 0; i < board.length; i++) {

            for (let j = 0; j < board[i].length; j++) {

                let cell = document.createElement('div');
                cell.classList += 'grid-cell';
                cell.id = `${i}-${j}`;
                cell.dataset.owner = player;
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.dataset.hasShip = board[i][j].hasShip;
                cell.dataset.isHit = board[i][j].isHit;
                boardDiv.append(cell);

            }

        }

    }

    static changeTurnLabel(text) {

        const turnDiv = document.querySelector('#whose-turn-label');
        turnDiv.textContent = text;

    }

}
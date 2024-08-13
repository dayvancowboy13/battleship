import Gameboard from './Gameboard';

export default class DOMFunctions {

    static {

        console.log('DOMFunctions class loaded');
        // document.addEventListener('DOMContentLoaded', () => {

        // });

        // document.addEventListener('radical', (e) => console.log(e.detail));
        // this.initListeners();

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

    static initListeners() {

        document.addEventListener('test-event', (e) => console.log(e.detail));
        document.addEventListener('keypress', function (e) {

            if (e.key === 's') {

                p1.gameBoard.printBoard();
                p2.gameBoard.printBoard();

            }

        });


    }

    static addDispatchEvent(target, detailText) {

        target.addEventListener('click', function () {

            this.dispatchEvent(new CustomEvent('radical', {
                bubbles: true,
                detail: detailText
            }));

        });

    }

}
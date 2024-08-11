import Gameboard from './Gameboard';

// renderBoards();
export default class DOMFunctions {

    static {

        console.log('DOMFunctions class loaded');
        // document.addEventListener('DOMContentLoaded', () => {

        // });

        const btn1 = document.querySelector('#btn1');
        const btn2 = document.querySelector('#btn2');
        const div = document.querySelector('#coolguy');

        // this.addDispatchEvent(btn1, btn1.dataset.msg);
        this.addDispatchEvent(btn2, btn2.dataset.msg);
        this.addDispatchEvent(div, div.textContent);


        document.addEventListener('radical', (e) => console.log(e.detail));

        // btn1.addEventListener('click', () => this.renderBoard('player'));

    }

    static renderBoard(player, board) {

        const boardDiv = document.querySelector(`#${player}-board`);
        boardDiv.innerHTML = '';

        // hasShip: false,
        //         isHit: false,
        //         shipType: null

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

    static addDispatchEvent(target, detailText) {

        target.addEventListener('click', function () {

            this.dispatchEvent(new CustomEvent('radical', {
                bubbles: true,
                detail: detailText
            }));

        });

    }

}
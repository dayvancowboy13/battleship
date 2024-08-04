import Ship from './Ship.js';

export default class Gameboard {

    boardRows = 10;

    boardCols = 10;

    constructor() {

        this.boardArray = this.#createBoard();

    }

    #createBoard() {

        let arr = [];

        for (let i = 0; i < this.boardRows; i++) {

            arr.push([]);

            for (let j = 0; j < this.boardCols; j++) arr[i].push(0);

        }


        return arr;

    }

}
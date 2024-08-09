import Gameboard from './Gameboard.js';

export default class Player {

    constructor(PlayerType) {

        this.playerType = PlayerType;
        this.gameBoard = new Gameboard();

    }

}
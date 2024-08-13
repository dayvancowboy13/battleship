import Gameboard from './Gameboard.js';

export default class Player {

    constructor(PlayerType) {

        this.playerType = PlayerType;
        this.gameBoard = new Gameboard();

    }

    makeRandomMove() {
        // code for the computer to make a move
        // might not end up staying in this class
    }

}
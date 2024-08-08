import Ship from './Ship.js';

export default class Gameboard {

    #boardRows = 10;

    #boardCols = 10;

    constructor() {

        this.boardArray = this.#createBoard();

        this.carrier = new Ship(5);
        this.battleship = new Ship(4);
        this.destroyer = new Ship(3);
        this.submarine = new Ship(3);
        this.patrolBoat = new Ship(2);

    }

    placeShip(
        shipName, shipOrientation = '-', startCoord
    ) {

        // shipOrientation: '|' for vertical or '-' for horizontal

        let shipCoords = this.#computeShipCoordinates(
            this.#getShipLength(shipName), shipOrientation, startCoord
        );

        if (this.#checkNoCollision(shipCoords)) {

            this.#setShipCoords(shipName, shipCoords);

            shipCoords.forEach((pair) => {

                let row = pair[0];
                let col = pair[1];
                this.boardArray[row][col].hasShip = true;

            });


            return true;

        } else return false;

    }

    #checkNoCollision(shipCoords) {

        // receives the full coordinates which the ship wants to occupy,
        // and reports whether it will be a valid placement

        for (let i = 0; i < shipCoords.length; i++) {

            let row = shipCoords[i][0];
            let col = shipCoords[i][1];

            if (this.boardArray[row][col].hasShip === true) return false;

        }

        return true;

    }

    #setShipCoords(ship, coords) {

        switch (ship) {

            case 'carrier':
                this.carrier.coordinates = coords;
                break;
            case 'battleship':
                this.battleship.coordinates = coords;
                break;
            case 'destroyer':
                this.destroyer.coordinates = coords;
                break;
            case 'submarine':
                this.submarine.coordinates = coords;
                break;
            case 'patrolBoat':
                this.patrolBoat.coordinates = coords;
                break;

            default:
                return null;

        }

    }

    #getShipLength(ship) {

        switch (ship) {

            case 'carrier':
                return this.carrier.length;
                break;
            case 'battleship':
                return this.battleship.length;
                break;
            case 'destroyer':
                return this.destroyer.length;
                break;
            case 'submarine':
                return this.submarine.length;
                break;
            case 'patrolBoat':
                return this.patrolBoat.length;
                break;

            default:
                return null;
                break;

        }

    }

    #computeShipCoordinates(
        shipLength, shipOrientation, startCoord
    ) {

        // compute which coordinates a ship will occupy

        let row = startCoord[0];
        let col = startCoord[1];

        if (row + shipLength > 9 ||
            col + shipLength > 9
        ) return null;

        let coords = [];
        if (shipOrientation === '-') {

            for (let i = col; i < col + shipLength; i++) {

                coords.push([row, i]);

            }

        } else if (shipOrientation === '|') {

            for (let i = row; i < row + shipLength; i++) {

                coords.push([i, col]);

            }

        }
        return coords;

    }

    receieveAttack(coord) {
        // Takes coords and determines whether a ship has been hit

        // 1. Get the object at boardArray[row][col]
    }

    printBoard() {

        let fullBoard = '';

        for (let i = 0; i < this.boardArray.length; i++) {

            let printString = '';
            for (let j = 0; j < this.boardArray[i].length; j++) {

                if (this.boardArray[i][j].hasShip === true) printString += 'X';
                else printString += 'O';

            }
            fullBoard += printString + '\n';

        }

        console.log(fullBoard);

    }

    #createBoard() {

        let arr = [];

        for (let i = 0; i < this.#boardRows; i++) {

            arr.push([]);

            for (let j = 0; j < this.#boardCols; j++) arr[i].push({
                hasShip: false,
                isHit: false
            });

        }


        return arr;

    }

}
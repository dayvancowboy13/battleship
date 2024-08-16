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

        this.shipsArray = [
            this.patrolBoat,
            this.submarine,
            this.destroyer,
            this.battleship,
            this.carrier
        ];

    }

    allShipsSunk() {

        for (let i = 0; i < this.shipsArray.length; i++) {

            if (!this.shipsArray[i].isSunk()) return false;

        }

        return true;

    }

    placeShip(
        shipName, shipOrientation = '-', startCoord
    ) {

        // shipOrientation: '|' for vertical or '-' for horizontal

        let shipCoords = this.#computeShipCoordinates(
            this[shipName].length, shipOrientation, startCoord
        );

        if (shipCoords === null) return false;

        if (this.#checkNoCollision(shipCoords)) {

            // this.#setShipCoords(shipName, shipCoords);
            this[shipName].coordinates = shipCoords;

            shipCoords.forEach((pair) => {

                let row = pair[0];
                let col = pair[1];
                this.boardArray[row][col].hasShip = true;
                this.boardArray[row][col].shipType = shipName;

            });


            return true;

        } else return false;

    }

    placeShipsRandomly() {

        const shipNames = [
            'carrier',
            'battleship',
            'destroyer',
            'submarine',
            'patrolBoat'
        ];
        shipNames.forEach((ship) => {

            let orientation;
            let randomRow;
            let randomCol;

            do {

                if (Math.random() > 0.5) orientation = '|';
                else orientation = '-';

                randomRow = Math.floor(Math.random() * 10);
                randomCol = Math.floor(Math.random() * 10);

            } while (!this.placeShip(
                ship, orientation, [randomRow, randomCol]
            ));

        });


    }

    receiveAttack(coords) {

        // Takes coords and determines whether a ship has been hit

        if (this.boardArray[coords[0]][coords[1]].isHit === false &&
            this.boardArray[coords[0]][coords[1]].hasShip === true) {

            // sends hit function to correct ship
            this.boardArray[coords[0]][coords[1]].isHit = true;
            let shipHit = this.boardArray[coords[0]][coords[1]].shipType;
            this[shipHit].hit();
            return true;

        } else {

            this.boardArray[coords[0]][coords[1]].isHit = true;
            return false;

        }

    }

    checkShipSunk(coords) {

        let shipHit = this.boardArray[coords[0]][coords[1]].shipType;
        return this[shipHit].isSunk();

    }

    #checkNoCollision(coords) {

        // receives the full coordinates which the ship wants to occupy,
        // and reports whether it will be a valid placement

        for (let i = 0; i < coords.length; i++) {

            let row = coords[i][0];
            let col = coords[i][1];

            if (this.boardArray[row][col].hasShip === true) return false;

        }

        return true;

    }

    #computeShipCoordinates(
        shipLength, shipOrientation, startCoord
    ) {

        // compute which coordinates a ship will occupy

        let row = startCoord[0];
        let col = startCoord[1];

        let coords = [];
        if (shipOrientation === '-') {

            if (col + shipLength > 9) return null;

            for (let i = col; i < col + shipLength; i++) {

                coords.push([row, i]);

            }

        } else if (shipOrientation === '|') {

            if (row + shipLength > 9) return null;

            for (let i = row; i < row + shipLength; i++) {

                coords.push([i, col]);

            }

        }
        return coords;

    }

    printBoard() {

        let fullBoard = '';

        for (let i = 0; i < this.boardArray.length; i++) {

            let printString = '';
            for (let j = 0; j < this.boardArray[i].length; j++) {

                if (this.boardArray[i][j].hasShip === true &&
                    this.boardArray[i][j].isHit === false
                ) printString += '+ ';
                else if (this.boardArray[i][j].isHit === true &&
                    this.boardArray[i][j].hasShip === false
                ) printString += 'x ';
                else if (this.boardArray[i][j].isHit === true &&
                    this.boardArray[i][j].hasShip === true
                ) printString += 'X ';
                else printString += '- ';

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
                isHit: false,
                shipType: null
            });

        }


        return arr;

    }

}
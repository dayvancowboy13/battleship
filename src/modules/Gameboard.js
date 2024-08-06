import Ship from './Ship.js';
// 1x ship size 5
// 1x ship size 4
// 2x ship size 3
// 1x ship size 2

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

        // "wrapper" function for the abstracted action of filling in the board array
        // shipOrientation: '|' for vertical or '-' for horizontal

        const row = startCoord[0];
        const col = startCoord[1];

        if (this.boardArray[row][col].hasShip === false) {

            this.boardArray[row][col].hasShip = true;
            return true;

        } else return false;

        // SPEC: place ships at specific coordinates by calling the ship class
        // some other code will call the function?
        // ships are a certain length, so the function needs to take that into account
        // how the function is called too
        // will eventually need code to regulate how many of each ship

        // 1. Given a type of ship (determines the length)
        // 2. Based on its length, orientation, and starting coords, figure out which coordinates it will occupy (separate function?)
        // 3. Verify that those coordinates are not already occupied
        // 3a. If they are occupied, prevent the new ship from being placed
        // 4. If the coordinates are clear, change their hasShip property to true in boardArray

    }

    checkNoCollision(shipCoords) {

        shipCoords.forEach((pair) => {

            let row = pair[0];
            let col = pair[1];

            if (this.boardArray[row][col].hasShip === true) return false;

        });

        return true;

    }

    getShipLength(ship) {

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

    computeShipCoordinates(
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
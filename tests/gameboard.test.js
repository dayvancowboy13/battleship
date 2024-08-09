import Gameboard from '../src/modules/Gameboard.js';
// If I'm struggling to write a test, then I know that I haven't fully understood the problem I'm trying to solve.

describe('Testing Gameboard class functionality', () => {

    let gb1 = new Gameboard();

    test('Gameboard class exists and creates instance', () => {

        expect(gb1).toBeDefined();
        expect(gb1.boardArray).toBeDefined();
        expect(gb1.boardArray.length).toBe(10);
        expect(gb1.boardArray[0].length).toBe(10);


    });

    test('Gameboard board array elemnts hold an object with hasShip and isHit properties', () => {

        expect(gb1.boardArray[0][0]).toBeDefined();
        expect(gb1.boardArray[0][0]).toMatchObject({});
        expect(gb1.boardArray[0][0].hasShip).toBeDefined();
        expect(gb1.boardArray[0][0].isHit).toBeDefined();
        expect(gb1.boardArray[0][0].hasShip).toBe(false);
        expect(gb1.boardArray[0][0].isHit).toBe(false);
        expect(gb1.boardArray[0][0].hasBox).not.toBeDefined();

    });

    test('Gameboard property boardArray is 10x10', () => {

        expect(gb1.boardArray).toBeDefined();
        expect(gb1.boardArray.length).toBe(10);
        expect(gb1.boardArray[0].length).toBe(10);


    });

});

describe('Testing placeShip method functionality', () => {

    let gb1 = new Gameboard();

    test('placeShip() method exists', () => {

        expect(gb1.placeShip).toBeDefined();

    });

    test('placeShip() method exists', () => {

        expect(gb1.placeShip).toBeDefined();

    });

    test.skip('getShipLength() returns the expected length given the name', () => {

        expect(gb1.getShipLength('carrier')).toBe(5);
        expect(gb1.getShipLength('battleship')).toBe(4);
        expect(gb1.getShipLength('destroyer')).toBe(3);
        expect(gb1.getShipLength('submarine')).toBe(3);
        expect(gb1.getShipLength('patrolBoat')).toBe(2);
        expect(gb1.getShipLength('random')).toBeNull();

    });

    test.skip('computeShipCoordinates() returns coordinates that the ship will occupy', () => {

        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('carrier'), '-', [0, 0]
        )).toStrictEqual([
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4]
        ]);
        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('battleship'), '-', [0, 0]
        )).toStrictEqual([
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3]
        ]);
        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('patrolBoat'), '-', [0, 0]
        )).toStrictEqual([[0, 0], [0, 1]]);

        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('carrier'), '|', [0, 0]
        )).toStrictEqual([
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0]
        ]);
        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('battleship'), '|', [0, 0]
        )).toStrictEqual([
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0]
        ]);
        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('patrolBoat'), '|', [0, 0]
        )).toStrictEqual([[0, 0], [1, 0]]);

        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('carrier'), '|', [4, 0]
        )).not.toBeNull();
        expect(gb1.computeShipCoordinates(
            gb1.getShipLength('patrolBoat'), '|', [9, 0]
        )).toBeNull();

    });

    test.skip('checkNoCollisions reports accurate collisions', () => {

        let gb2 = new Gameboard();

        gb2.printBoard();
        gb2.boardArray[0][1].hasShip = true;
        gb2.printBoard();
        expect(gb2.checkNoCollision([[0, 0], [0, 1]])).toBe(false);

    });

    test('placeShip() places a ship on the board, or does not if any spots are already occupied', () => {

        let gb2 = new Gameboard();

        expect(gb2.placeShip(
            'patrolBoat', '-', [0, 0]
        )).toBe(true);
        expect(gb2.placeShip(
            'patrolBoat', '-', [0, 0]
        )).toBe(false);

        // gb2.printBoard();

        expect(gb2.placeShip(
            'carrier', '|', [1, 1]
        )).toBe(true);
        expect(gb2.placeShip(
            'carrier', '-', [1, 0]
        )).toBe(false);

        // gb2.printBoard();


    });

});

describe.skip('Testing receiveAttack functionality', () => {

    const gb1 = new Gameboard();

    test('receiveAttack() method exists', () => {

        expect(gb1.receiveAttack).toBeDefined();

    });

    test('receiveAttack behaves as expected', () => {


        gb1.placeShip(
            'patrolBoat', '-', [0, 0]
        );

        let coords = [0, 0];
        let coords2 = [0, 1];
        let coords3 = [9, 9];


        // takes a pair of coordinates and:
        // 1. Determines whether or not the attack hit a ship
        // 1a. If it did, sends the hit function to the correct ship
        expect(gb1.receiveAttack(coords)).toBe(true);
        expect(gb1.patrolBoat.timesHit).toBe(1);
        gb1.receiveAttack(coords2);
        expect(gb1.patrolBoat.timesHit).toBe(2);
        expect(gb1.patrolBoat.isSunk()).toBe(true);

        // 1b. If not, record that the coordinates missed
        expect(gb1.receiveAttack(coords3)).toBe(false);

        gb1.placeShip(
            'battleship', '-', [9, 0]
        );


        expect(gb1.receiveAttack([9, 0])).toBe(true);
        expect(gb1.battleship.timesHit).toBe(1);
        gb1.receiveAttack([9, 1]);
        gb1.receiveAttack([9, 2]);
        gb1.receiveAttack([0, 2]);
        expect(gb1.boardArray[0][2].isHit).toBe(true);
        gb1.receiveAttack([5, 5]);
        gb1.receiveAttack([2, 2]);

        gb1.printBoard();


        expect(gb1.battleship.timesHit).toBe(3);
        expect(gb1.boardArray[2][2].isHit).toBe(true);
        expect(gb1.boardArray[5][5].isHit).toBe(true);
        expect(gb1.boardArray[3][3].isHit).toBe(false);

    });

});

describe('Gamebaord keeps track and reports whether or not all of their ships have been sunk', () => {

    let gb1 = new Gameboard();

    test('shipsArray is defined', () => {

        expect(gb1.shipsArray).toBeDefined();

    });
    test('Method allShipsSunk is defined', () => {

        expect(gb1.allShipsSunk).toBeDefined();

    });

    test('allShipsSunk reports correct status of ships', () => {


        // place all ships on the board
        gb1.placeShip(
            'patrolBoat', '-', [0, 0]
        );
        gb1.placeShip(
            'submarine', '-', [1, 0]
        );
        gb1.placeShip(
            'destroyer', '-', [2, 0]
        );
        gb1.placeShip(
            'battleship', '-', [3, 0]
        );
        gb1.placeShip(
            'carrier', '-', [4, 0]
        );
        gb1.printBoard();

        expect(gb1.allShipsSunk()).toBe(false);
        let coords1 = gb1.patrolBoat.coordinates;
        coords1.forEach((pair) => gb1.receiveAttack(pair));
        expect(gb1.allShipsSunk()).toBe(false);
        let coords2 = gb1.submarine.coordinates;
        coords2.forEach((pair) => gb1.receiveAttack(pair));
        let coords3 = gb1.destroyer.coordinates;
        coords3.forEach((pair) => gb1.receiveAttack(pair));
        expect(gb1.allShipsSunk()).toBe(false);
        let coords4 = gb1.battleship.coordinates;
        coords4.forEach((pair) => gb1.receiveAttack(pair));
        let coords5 = gb1.carrier.coordinates;
        coords5.forEach((pair) => gb1.receiveAttack(pair));
        gb1.printBoard();

        expect(gb1.allShipsSunk()).toBe(true);


    });

});
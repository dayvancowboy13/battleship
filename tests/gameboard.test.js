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

    test.skip('receiveAttack() method exists', () => {

        expect(gb1.receieveAttack).toBeDefined();

    });

});
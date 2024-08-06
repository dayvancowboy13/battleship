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

    test.skip('placeShip() method exists', () => {

        expect(gb1.placeShip).toBeDefined();

    });

    test('placeShip() takes coordinates, places a ship there', () => {

        expect(gb1.boardArray[0][0].hasShip).toBe(false);
        gb1.placeShip(
            0, 0, [0, 0]
        );
        expect(gb1.boardArray[0][0].hasShip).toBe(true);

    });

    test('placeShip() wont place a ship if the coord is already occupied', () => {

        let gb2 = new Gameboard();

        expect(gb2.placeShip(
            0, 0, [0, 0]
        )).toBe(true);
        expect(gb2.placeShip(
            0, 0, [0, 0]
        )).toBe(false);
        // expect(gb1.boardArray[0][0].hasShip).toBe(true);


        // gb1.placeShip([5, 1]);
        // expect(gb1.boardArray[5][1].hasShip).toBe(true);
        // console.log(gb1.boardArray);

    });

    test.skip('receiveAttack() method exists', () => {

        expect(gb1.receieveAttack).toBeDefined();

    });

});
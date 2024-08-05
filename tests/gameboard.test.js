import Gameboard from '../src/modules/Gameboard.js';
// 1x ship size 5
// 1x ship size 4
// 2x ship size 3
// 1x ship size 2

describe('Testing Gameboard class functionality', () => {

    let gb1 = new Gameboard();

    test('Gameboard class exists and creates instance', () => {

        expect(gb1).toBeDefined();
        expect(gb1.boardArray).toBeDefined();
        expect(gb1.boardArray.length).toBe(10);
        expect(gb1.boardArray[0].length).toBe(10);


    });

    test('Gameboard property boardArray is 10x10', () => {

        expect(gb1.boardArray).toBeDefined();
        expect(gb1.boardArray.length).toBe(10);
        expect(gb1.boardArray[0].length).toBe(10);


    });

    test('placeShip() method exists', () => {

        expect(gb1.placeShip).toBeDefined();

    });

    test('placeShip() takes coordinates, places a ship there', () => {

        gb1.placeShip([0, 0]);
        expect(gb1.boardArray[0][0]).toBe(1);

        gb1.placeShip([5, 1]);
        expect(gb1.boardArray[5][1]).toBe(1);
        console.log(gb1.boardArray);

    });

    test('receiveAttack() method exists', () => {

        expect(gb1.receieveAttack).toBeDefined();

    });

});
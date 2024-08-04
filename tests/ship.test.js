import Ship from '../src/modules/Ship.js';

describe('Basic tests for ship class', () => {

    let ship1 = new Ship();
    test('Ship object created and has properties', () => {

        expect(ship1).toBeDefined();
        expect(ship1.length).toBe(1);
        expect(ship1.timesHit).toBe(0);
        expect(ship1.sunk).toBe(false);

        expect(ship1.hit).toBeDefined();
        expect(ship1.isSunk).toBeDefined();

    });

    test('Ship method hit() increments the timesHit property, and method isSunk() properly reports isSunk property', () => {

        expect(ship1.isSunk()).toBe(false);
        expect(ship1.timesHit).toBe(0);
        ship1.hit();
        expect(ship1.timesHit).toBe(1);
        expect(ship1.isSunk()).toBe(true);

    });

});
import Ship from '../src/modules/Ship.js';

describe('Basic tests for ship class', () => {

    test('Ship object created', () => {

        let ship1 = new Ship();

        expect(ship1).toBeDefined();

    });

});
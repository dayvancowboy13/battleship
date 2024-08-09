import Player from '../src/modules/Player.js';

let p1 = new Player('human');
let p2 = new Player('computer');

test('Player class is defined', () => {

    expect(p1).toBeDefined();

});

test('Player class has \'playerType\' property', () => {

    expect(p1.playerType).toBeDefined();

});

test('Each Player class has its own Gameboard', () => {

    expect(p1.gameBoard).toBeDefined();
    expect(p2.gameBoard).toBeDefined();
    expect(p1.gameBoard === p2.gameBoard).toBe(false);

});
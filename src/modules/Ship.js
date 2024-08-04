export default class Ship {

    constructor() {

        this.length = 1;
        this.timesHit = 0;
        this.sunk = false;

        return 'Ship created!';

    }

    hit() {

        this.timesHit++;

    }

    isSunk() {

        if (this.timesHit >= this.length) this.sunk = true;
        else this.sunk = false;

        return this.sunk;

    }

}
export default class Ship {

    constructor(Length = 2) {

        this.length = Length;
        this.timesHit = 0;
        this.sunk = false;

        // return 'Ship created!';

    }

    set length(value) {

        if (value < 2) this._length = 2;
        else if (value > 5) this._length = 5;
        else this._length = value;

    }

    get length() {

        return this._length;

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
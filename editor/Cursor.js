/**
 * Cursor.js
 * Caret Manager
 */

export default class Cursor {

    constructor() {
        this.block = null;
        this.offset = 0;
    }

    move(block, offset = 0) {
        this.block = block;
        this.offset = offset;
        return this;
    }

    moveStart() {
        this.offset = 0;
        return this;
    }

    moveEnd(length) {
        this.offset = length;
        return this;
    }

    left() {
        if (this.offset > 0) this.offset--;
        return this;
    }

    right(max) {
        if (this.offset < max) this.offset++;
        return this;
    }

    getPosition() {
        return {
            block: this.block,
            offset: this.offset
        };
    }

    toJSON() {
        return this.getPosition();
    }

}


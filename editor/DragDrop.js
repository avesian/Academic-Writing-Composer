/**
 * DragDrop.js
 * Drag & Drop Manager
 */

export default class DragDrop {

    constructor() {

        this.dragging = null;

        this.target = null;

    }

    start(item) {

        this.dragging = item;

        return this;

    }

    over(target) {

        this.target = target;

        return this;

    }

    drop(callback = null) {

        if (!this.dragging || !this.target) {
            return null;
        }

        const result = {
            source: this.dragging,
            target: this.target
        };

        if (typeof callback === "function") {
            callback(result);
        }

        this.end();

        return result;

    }

    end() {

        this.dragging = null;

        this.target = null;

        return this;

    }

    isDragging() {

        return this.dragging !== null;

    }

    toJSON() {

        return {
            dragging: this.dragging,
            target: this.target
        };

    }

}


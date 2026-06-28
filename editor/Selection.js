```javascript
/**
 * Selection.js
 * Selection Manager
 */

export default class Selection {

    constructor() {
        this.start = null;
        this.end = null;
        this.collapsed = true;
    }

    set(start, end = start) {
        this.start = start;
        this.end = end;
        this.collapsed = start === end;
        return this;
    }

    clear() {
        this.start = null;
        this.end = null;
        this.collapsed = true;
        return this;
    }

    isCollapsed() {
        return this.collapsed;
    }

    getRange() {
        return {
            start: this.start,
            end: this.end
        };
    }

    contains(position) {
        if (this.start === null || this.end === null) return false;
        return position >= this.start && position <= this.end;
    }

    toJSON() {
        return {
            start: this.start,
            end: this.end,
            collapsed: this.collapsed
        };
    }

}
```

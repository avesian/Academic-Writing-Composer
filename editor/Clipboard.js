/**
 * Clipboard.js
 * Internal Clipboard
 */

export default class Clipboard {

    constructor() {
        this.data = null;
        this.type = null;
    }

    copy(data, type = "text") {
        this.data = structuredClone(data);
        this.type = type;
        return true;
    }

    cut(data, type = "text") {
        this.copy(data, type);
        return this.data;
    }

    paste() {
        if (!this.data) return null;
        return structuredClone(this.data);
    }

    clear() {
        this.data = null;
        this.type = null;
    }

    hasData() {
        return this.data !== null;
    }

    toJSON() {
        return {
            type: this.type,
            hasData: this.hasData()
        };
    }

}


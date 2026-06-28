```javascript
/**
 * Keyboard.js
 * Keyboard Shortcut Manager
 */

export default class Keyboard {

    constructor() {

        this.shortcuts = new Map();

    }

    register(key, callback) {

        this.shortcuts.set(
            key.toLowerCase(),
            callback
        );

        return this;

    }

    unregister(key) {

        this.shortcuts.delete(
            key.toLowerCase()
        );

        return this;

    }

    handle(event) {

        const keys = [];

        if (event.ctrlKey) keys.push("ctrl");
        if (event.shiftKey) keys.push("shift");
        if (event.altKey) keys.push("alt");

        keys.push(event.key.toLowerCase());

        const combo = keys.join("+");

        const action = this.shortcuts.get(combo);

        if (!action) return false;

        event.preventDefault();

        action(event);

        return true;

    }

    clear() {

        this.shortcuts.clear();

    }

    toJSON() {

        return {
            shortcuts: this.shortcuts.size
        };

    }

}
```

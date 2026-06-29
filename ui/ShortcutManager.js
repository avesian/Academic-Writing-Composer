/**
 * ShortcutManager.js
 * Keyboard Shortcut Manager
 * Version: 2.0.0
 */

export default class ShortcutManager {

    constructor(app = null) {

        this.app = app;

        this.shortcuts = new Map();

        this.enabled = true;

        this.listener = this.handle.bind(this);

        this.state = "CREATED";

    }

    init() {

        document.addEventListener(
            "keydown",
            this.listener
        );

        this.registerDefaults();

        this.state = "READY";

        return this;

    }

    registerDefaults() {

        this.register("ctrl+n", () => {

            this.app?.emit("shortcut:new");

        });

        this.register("ctrl+o", () => {

            this.app?.emit("shortcut:open");

        });

        this.register("ctrl+s", () => {

            this.app?.emit("shortcut:save");

        });

        this.register("ctrl+z", () => {

            this.app?.emit("shortcut:undo");

        });

        this.register("ctrl+y", () => {

            this.app?.emit("shortcut:redo");

        });

        this.register("ctrl+p", () => {

            this.app?.emit("shortcut:preview");

        });

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

        if (!this.enabled) return;

        const keys = [];

        if (event.ctrlKey) keys.push("ctrl");
        if (event.shiftKey) keys.push("shift");
        if (event.altKey) keys.push("alt");

        keys.push(event.key.toLowerCase());

        const combo = keys.join("+");

        const action = this.shortcuts.get(combo);

        if (!action) return;

        event.preventDefault();

        action(event);

    }

    enable() {

        this.enabled = true;

        return this;

    }

    disable() {

        this.enabled = false;

        return this;

    }

    clear() {

        this.shortcuts.clear();

        return this;

    }

    destroy() {

        document.removeEventListener(
            "keydown",
            this.listener
        );

        this.shortcuts.clear();

        this.state = "DESTROYED";

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            enabled: this.enabled,
            shortcuts: this.shortcuts.size
        };

    }

}


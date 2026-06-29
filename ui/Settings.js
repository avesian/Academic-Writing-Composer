```javascript id="k4x8pm"
/**
 * Settings.js
 * Application Settings Manager
 * Version: 2.0.0
 */

export default class Settings {

    constructor(app = null) {

        this.app = app;

        this.storageKey = "awc.settings";

        this.defaults = {
            theme: "light",
            language: "id",
            autosave: true,
            spellcheck: true,
            pageSize: "A4",
            zoom: 100
        };

        this.settings = {
            ...this.defaults
        };

        this.state = "CREATED";

    }

    init() {

        this.load();

        this.state = "READY";

        return this;

    }

    get(key) {

        return this.settings[key];

    }

    set(key, value) {

        this.settings[key] = value;

        this.save();

        this.app?.emit("settings:change", {
            key,
            value
        });

        return this;

    }

    has(key) {

        return Object.hasOwn(this.settings, key);

    }

    remove(key) {

        if (!this.has(key)) return this;

        delete this.settings[key];

        this.save();

        return this;

    }

    reset() {

        this.settings = {
            ...this.defaults
        };

        this.save();

        this.app?.emit("settings:reset");

        return this;

    }

    load() {

        try {

            const data = localStorage.getItem(this.storageKey);

            if (data) {

                this.settings = {
                    ...this.defaults,
                    ...JSON.parse(data)
                };

            }

        } catch (error) {

            console.warn("Failed to load settings.", error);

        }

        return this;

    }

    save() {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.settings)
        );

        return this;

    }

    export() {

        return {
            ...this.settings
        };

    }

    import(data = {}) {

        this.settings = {
            ...this.defaults,
            ...data
        };

        this.save();

        this.app?.emit("settings:import");

        return this;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            settings: this.settings
        };

    }

}
```

/**
 * Theme.js
 * Theme Manager
 * Version: 2.0.0
 */

export default class Theme {

    constructor(app = null) {

        this.app = app;

        this.current = "light";

        this.themes = {
            light: "awc-theme-light",
            dark: "awc-theme-dark"
        };

        this.state = "CREATED";

    }

    init() {

        this.apply(this.current);

        this.state = "READY";

        return this;

    }

    apply(name = "light") {

        if (!this.themes[name]) return this;

        Object.values(this.themes).forEach(className => {

            document.body.classList.remove(className);

        });

        document.body.classList.add(this.themes[name]);

        this.current = name;

        this.app?.emit("theme:change", name);

        return this;

    }

    toggle() {

        return this.apply(
            this.current === "light"
                ? "dark"
                : "light"
        );

    }

    register(name, className) {

        this.themes[name] = className;

        return this;

    }

    unregister(name) {

        if (name === "light" || name === "dark") {

            return this;

        }

        delete this.themes[name];

        return this;

    }

    has(name) {

        return Object.hasOwn(this.themes, name);

    }

    getCurrent() {

        return this.current;

    }

    getThemes() {

        return { ...this.themes };

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            current: this.current,
            themes: Object.keys(this.themes)
        };

    }

}


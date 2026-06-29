```javascript id="9whf2e"
/**
 * IconManager.js
 * Icon Registry & Loader
 * Version: 2.0.0
 */

export default class IconManager {

    constructor(app = null) {

        this.app = app;

        this.icons = new Map();

        this.defaultIcon = "□";

        this.state = "CREATED";

    }

    register(name, icon) {

        if (!name) return this;

        this.icons.set(name, icon);

        this.app?.emit("icon:register", name);

        return this;

    }

    unregister(name) {

        if (this.icons.delete(name)) {

            this.app?.emit("icon:unregister", name);

        }

        return this;

    }

    get(name) {

        return this.icons.get(name) || this.defaultIcon;

    }

    has(name) {

        return this.icons.has(name);

    }

    load(collection = {}) {

        Object.entries(collection).forEach(
            ([name, icon]) => {

                this.register(name, icon);

            }
        );

        return this;

    }

    clear() {

        this.icons.clear();

        this.app?.emit("icon:clear");

        return this;

    }

    keys() {

        return [...this.icons.keys()];

    }

    values() {

        return [...this.icons.values()];

    }

    entries() {

        return [...this.icons.entries()];

    }

    size() {

        return this.icons.size;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            totalIcons: this.icons.size,
            icons: this.keys()
        };

    }

}
```

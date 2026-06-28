```javascript
/**
 * App.js
 * Academic Writing Composer SPA
 * Main Application Controller
 * Version: 2.0.0
 */

import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";
import Canvas from "./Canvas.js";
import Statusbar from "./Statusbar.js";

export default class App {

    constructor(options = {}) {

        this.options = {
            container: "#app",
            theme: "light",
            autosave: true,
            ...options
        };

        this.workspace = null;
        this.toolbar = null;
        this.sidebar = null;
        this.canvas = null;
        this.statusbar = null;

        this.state = "CREATED";

        this.events = new Map();

    }

    init() {

        this.workspace = new Workspace(this);

        this.toolbar = new Toolbar(this);

        this.sidebar = new Sidebar(this);

        this.canvas = new Canvas(this);

        this.statusbar = new Statusbar(this);

        this.workspace.mount(
            this.options.container
        );

        this.toolbar.render();

        this.sidebar.render();

        this.canvas.render();

        this.statusbar.render();

        this.bindEvents();

        this.state = "READY";

        this.emit("ready");

        return this;

    }

    bindEvents() {

        window.addEventListener("resize", () => {

            this.emit("resize");

        });

    }

    render() {

        this.workspace.render();

        this.toolbar.render();

        this.sidebar.render();

        this.canvas.render();

        this.statusbar.render();

        return this;

    }

    refresh() {

        this.render();

        this.emit("refresh");

        return this;

    }

    destroy() {

        this.emit("destroy");

        this.workspace = null;
        this.toolbar = null;
        this.sidebar = null;
        this.canvas = null;
        this.statusbar = null;

        this.state = "DESTROYED";

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

        return this;

    }

    off(event, callback) {

        if (!this.events.has(event)) return this;

        this.events.set(
            event,
            this.events
                .get(event)
                .filter(fn => fn !== callback)
        );

        return this;

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) return;

        this.events
            .get(event)
            .forEach(fn => fn(payload));

    }

    getWorkspace() {

        return this.workspace;

    }

    getToolbar() {

        return this.toolbar;

    }

    getSidebar() {

        return this.sidebar;

    }

    getCanvas() {

        return this.canvas;

    }

    getStatusbar() {

        return this.statusbar;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            theme: this.options.theme,
            autosave: this.options.autosave
        };

    }

}
```

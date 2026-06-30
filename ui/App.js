/**
 * App.js
 * Test 2
 * Workspace + Toolbar + Sidebar
 */

import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";

export default class App {

    constructor() {

        this.root = null;

        this.workspace = null;
        this.toolbar = null;
        this.sidebar = null;

        this.events = new Map();

    }

    async init() {

        this.root = document.getElementById("app");

        if (!this.root) {
            throw new Error("#app not found");
        }

        this.workspace = new Workspace(this);

        this.root.appendChild(
            this.workspace.render()
        );

        this.toolbar = new Toolbar(this);

        this.workspace
            .getToolbarContainer()
            .appendChild(
                this.toolbar.render()
            );

        this.sidebar = new Sidebar(this);

        this.workspace
            .getSidebarContainer()
            .appendChild(
                this.sidebar.render()
            );

        return this;

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) {

            return;

        }

        for (const listener of this.events.get(event)) {

            listener(payload);

        }

    }

    off(event, callback) {

        if (!this.events.has(event)) {

            return;

        }

        this.events.set(
            event,
            this.events
                .get(event)
                .filter(fn => fn !== callback)
        );

    }

}


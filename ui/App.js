/**
 * App.js
 * Academic Writing Composer
 * Bootstrap Application
 */

import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";
import Canvas from "./Canvas.js";
import Statusbar from "./Statusbar.js";

export default class App {

    constructor() {

        this.root = null;

        this.workspace = null;

        this.toolbar = null;

        this.sidebar = null;

        this.canvas = null;

        this.statusbar = null;

        this.events = new Map();

        this.state = "CREATED";

    }

    async init() {

        this.root = document.getElementById("app");

        if (!this.root) {

            throw new Error("#app container not found.");

        }

        this.createWorkspace();

        this.mountComponents();

        this.bindEvents();

        this.state = "READY";

        this.emit("app:ready");

        return this;

    }

    createWorkspace() {

        this.workspace = new Workspace(this);

        this.root.appendChild(

            this.workspace.render()

        );

    }

    mountComponents() {

        this.toolbar = new Toolbar(this);

        this.sidebar = new Sidebar(this);

        this.canvas = new Canvas(this);

        this.statusbar = new Statusbar(this);

        this.workspace
            .getToolbarContainer()
            .appendChild(
                this.toolbar.render()
            );

        this.workspace
            .getSidebarContainer()
            .appendChild(
                this.sidebar.render()
            );

        this.workspace
            .getCanvasContainer()
            .appendChild(
                this.canvas.render()
            );

        this.workspace
            .getStatusbarContainer()
            .appendChild(
                this.statusbar.render()
            );

    }

    bindEvents() {

        window.addEventListener(

            "beforeunload",

            event => {

                this.emit("app:close");

            }

        );

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events
            .get(event)
            .push(callback);

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) {

            return;

        }

        this.events
            .get(event)
            .forEach(listener => {

                listener(payload);

            });

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

    getComponent(name) {

        return this[name];

    }

    getState() {

        return this.state;

    }

}


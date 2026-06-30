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
            throw new Error("Container #app tidak ditemukan.");
        }

        this.createWorkspace();

        this.mountComponents();

        this.bindEvents();

        this.state = "READY";

        this.emit("app:ready");

        document.getElementById("loading-screen")?.remove();

        return this;

    }

    createWorkspace() {

        this.workspace = new Workspace(this);

        const element = this.workspace.render();

        if (!(element instanceof HTMLElement)) {
            throw new Error("Workspace.render() harus mengembalikan HTMLElement.");
        }

        this.root.appendChild(element);

    }

    mountComponents() {

        this.toolbar = new Toolbar(this);
        this.sidebar = new Sidebar(this);
        this.canvas = new Canvas(this);
        this.statusbar = new Statusbar(this);

        this.workspace
            .getToolbarContainer()
            .appendChild(this.toolbar.render());

        this.workspace
            .getSidebarContainer()
            .appendChild(this.sidebar.render());

        this.workspace
            .getCanvasContainer()
            .appendChild(this.canvas.render());

        this.workspace
            .getStatusbarContainer()
            .appendChild(this.statusbar.render());

    }

    bindEvents() {

        window.addEventListener("beforeunload", () => {

            this.emit("app:close");

        });

    }

    on(event, callback) {

        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event).push(callback);

    }

    off(event, callback) {

        if (!this.events.has(event)) {
            return;
        }

        this.events.set(
            event,
            this.events.get(event).filter(fn => fn !== callback)
        );

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) {
            return;
        }

        for (const listener of this.events.get(event)) {
            listener(payload);
        }

    }

    getComponent(name) {

        return this[name];

    }

    getState() {

        return this.state;

    }

}


import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";

export default class App {

    constructor() {
        this.events = new Map();
    }

    on(e, cb) {
        if (!this.events.has(e)) this.events.set(e, []);
        this.events.get(e).push(cb);
    }

    emit(e, p) {
        (this.events.get(e) || []).forEach(fn => fn(p));
    }

    async init() {

        const root = document.getElementById("app");

        const workspace = new Workspace(this);

        root.appendChild(workspace.render());

        const toolbar = new Toolbar(this);

        workspace
            .getToolbarContainer()
            .appendChild(toolbar.render());

    }

}

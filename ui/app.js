```javascript
import Workspace from "./Workspace.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";
import Canvas from "./Canvas.js";
import Statusbar from "./Statusbar.js";

export default class App {

    constructor() {

        this.root = document.getElementById("app");

        this.components = {};

        this.events = new Map();

    }

    async init() {

        this.createLayout();

        this.mountComponents();

        this.emit("app:ready");

    }

    createLayout() {

        this.root.innerHTML = `
            <div class="awc-workspace">

                <header id="awc-toolbar"></header>

                <main class="awc-main">

                    <aside id="awc-sidebar"></aside>

                    <section id="awc-canvas"></section>

                </main>

                <footer id="awc-statusbar"></footer>

            </div>
        `;

    }

    mountComponents() {

        this.components.toolbar = new Toolbar(this);

        this.components.sidebar = new Sidebar(this);

        this.components.canvas = new Canvas(this);

        this.components.statusbar = new Statusbar(this);

        this.components.workspace = new Workspace(this);

        document
            .getElementById("awc-toolbar")
            .appendChild(
                this.components.toolbar.render()
            );

        document
            .getElementById("awc-sidebar")
            .appendChild(
                this.components.sidebar.render()
            );

        document
            .getElementById("awc-canvas")
            .appendChild(
                this.components.canvas.render()
            );

        document
            .getElementById("awc-statusbar")
            .appendChild(
                this.components.statusbar.render()
            );

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) return;

        this.events
            .get(event)
            .forEach(callback => callback(payload));

    }

    get(name) {

        return this.components[name];

    }

}
```

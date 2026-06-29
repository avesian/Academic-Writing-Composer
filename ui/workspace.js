```javascript
/**
 * Workspace.js
 * Academic Writing Composer
 * Main Workspace Container
 */

export default class Workspace {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.toolbar = null;

        this.sidebar = null;

        this.canvas = null;

        this.statusbar = null;

        this.state = "CREATED";

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("div");

        this.element.className = "awc-workspace";

        this.element.innerHTML = `
            <header
                id="awc-toolbar"
                class="awc-toolbar">
            </header>

            <main class="awc-main">

                <aside
                    id="awc-sidebar"
                    class="awc-sidebar">
                </aside>

                <section
                    id="awc-canvas"
                    class="awc-canvas">
                </section>

            </main>

            <footer
                id="awc-statusbar"
                class="awc-statusbar">
            </footer>
        `;

        this.toolbar = this.element.querySelector("#awc-toolbar");

        this.sidebar = this.element.querySelector("#awc-sidebar");

        this.canvas = this.element.querySelector("#awc-canvas");

        this.statusbar = this.element.querySelector("#awc-statusbar");

        this.bindEvents();

        this.state = "RENDERED";

        return this.element;

    }

    bindEvents() {

        window.addEventListener(
            "resize",
            () => this.handleResize()
        );

        this.app.on(
            "workspace:refresh",
            () => this.refresh()
        );

    }

    handleResize() {

        this.app.emit("workspace:resize", {
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    refresh() {

        this.app.emit("workspace:updated");

    }

    getToolbarContainer() {

        return this.toolbar;

    }

    getSidebarContainer() {

        return this.sidebar;

    }

    getCanvasContainer() {

        return this.canvas;

    }

    getStatusbarContainer() {

        return this.statusbar;

    }

    destroy() {

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        this.element?.remove();

        this.element = null;

        this.state = "DESTROYED";

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}
```

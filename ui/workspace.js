```javascript id="1d8xwe"
/**
 * Workspace.js
 * Main Workspace Layout
 * Version: 2.0.0
 */

export default class Workspace {

    constructor(app = null) {

        this.app = app;

        this.container = null;

        this.root = null;

        this.layout = {
            sidebar: null,
            canvas: null,
            properties: null,
            statusbar: null
        };

        this.state = "CREATED";

    }

    mount(selector = "#app") {

        this.container =
            typeof selector === "string"
                ? document.querySelector(selector)
                : selector;

        if (!this.container) {
            throw new Error("Workspace container not found.");
        }

        this.createLayout();

        this.render();

        this.state = "MOUNTED";

        return this;

    }

    createLayout() {

        this.root = document.createElement("div");

        this.root.className = "awc-workspace";

        this.root.innerHTML = `
            <div class="awc-toolbar"></div>

            <div class="awc-body">

                <aside class="awc-sidebar"></aside>

                <main class="awc-canvas"></main>

                <aside class="awc-properties"></aside>

            </div>

            <footer class="awc-statusbar"></footer>
        `;

        this.layout.sidebar =
            this.root.querySelector(".awc-sidebar");

        this.layout.canvas =
            this.root.querySelector(".awc-canvas");

        this.layout.properties =
            this.root.querySelector(".awc-properties");

        this.layout.statusbar =
            this.root.querySelector(".awc-statusbar");

        return this;

    }

    render() {

        if (!this.container || !this.root) return this;

        this.container.innerHTML = "";

        this.container.appendChild(this.root);

        this.state = "RENDERED";

        return this;

    }

    resize() {

        this.app?.emit("workspace:resize");

        return this;

    }

    clear() {

        if (this.layout.canvas) {
            this.layout.canvas.innerHTML = "";
        }

        return this;

    }

    destroy() {

        if (this.root) {

            this.root.remove();

        }

        this.root = null;

        this.container = null;

        this.state = "DESTROYED";

    }

    getSidebarElement() {

        return this.layout.sidebar;

    }

    getCanvasElement() {

        return this.layout.canvas;

    }

    getPropertiesElement() {

        return this.layout.properties;

    }

    getStatusbarElement() {

        return this.layout.statusbar;

    }

    getRootElement() {

        return this.root;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            mounted: !!this.root
        };

    }

}
```

```javascript
/**
 * Workspace.js
 * Academic Writing Composer
 * Layout Container
 */

export default class Workspace {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.refs = {};

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

        this.refs = {

            toolbar:
                this.element.querySelector("#awc-toolbar"),

            sidebar:
                this.element.querySelector("#awc-sidebar"),

            canvas:
                this.element.querySelector("#awc-canvas"),

            statusbar:
                this.element.querySelector("#awc-statusbar")

        };

        this.state = "READY";

        return this.element;

    }

    mount(name, component) {

        if (!this.refs[name]) {

            throw new Error(`Unknown container : ${name}`);

        }

        this.refs[name].replaceChildren(
            component.render()
        );

        return this;

    }

    getToolbarContainer() {

        return this.refs.toolbar;

    }

    getSidebarContainer() {

        return this.refs.sidebar;

    }

    getCanvasContainer() {

        return this.refs.canvas;

    }

    getStatusbarContainer() {

        return this.refs.statusbar;

    }

    refresh() {

        this.app.emit("workspace:refresh");

    }

    getState() {

        return this.state;

    }

}
```

Setelah file ini dipakai, alur integrasi menjadi:

```text
index.html
      │
      ▼
App.init()
      │
      ▼
Workspace.render()
      │
      ├── mount("toolbar", Toolbar)
      ├── mount("sidebar", Sidebar)
      ├── mount("canvas", Canvas)
      └── mount("statusbar", Statusbar)
```

Sehingga urutan **Workspace → Toolbar → Sidebar → Canvas → Statusbar** sudah benar-benar terhubung.

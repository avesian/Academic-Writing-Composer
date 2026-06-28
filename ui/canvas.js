```javascript
/**
 * Canvas.js
 * Document Canvas
 * Version: 2.0.0
 */

export default class Canvas {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.page = null;

        this.scale = 1;

        this.document = null;

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-canvas");

        if (!this.element) return this;

        this.element.innerHTML = "";

        this.page = document.createElement("div");

        this.page.className = "awc-page";

        this.page.innerHTML = `
            <div class="awc-page-content"></div>
        `;

        this.element.appendChild(this.page);

        this.state = "RENDERED";

        return this;

    }

    setDocument(document) {

        this.document = document;

        this.refresh();

        return this;

    }

    refresh() {

        if (!this.page) return this;

        const content = this.page.querySelector(
            ".awc-page-content"
        );

        content.innerHTML = "";

        if (!this.document) return this;

        const blocks = this.document.getBlocks
            ? this.document.getBlocks()
            : [];

        blocks.forEach(block => {

            const node = document.createElement("section");

            node.className = "awc-block";

            node.dataset.id = block.id ?? "";

            node.innerHTML = `
                <div class="awc-block-title">
                    ${block.title ?? block.type ?? "Block"}
                </div>
            `;

            content.appendChild(node);

        });

        return this;

    }

    zoom(value) {

        this.scale = Math.max(0.5, Math.min(3, value));

        if (this.page) {

            this.page.style.transform =
                `scale(${this.scale})`;

            this.page.style.transformOrigin =
                "top center";

        }

        this.app?.emit("canvas:zoom", this.scale);

        return this;

    }

    resetZoom() {

        return this.zoom(1);

    }

    clear() {

        if (!this.page) return this;

        const content = this.page.querySelector(
            ".awc-page-content"
        );

        content.innerHTML = "";

        return this;

    }

    focus() {

        this.element?.focus();

        return this;

    }

    getElement() {

        return this.element;

    }

    getPage() {

        return this.page;

    }

    getScale() {

        return this.scale;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            scale: this.scale,
            hasDocument: !!this.document
        };

    }

}
```

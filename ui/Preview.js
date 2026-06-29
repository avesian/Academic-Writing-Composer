/**
 * Preview.js
 * Live Document Preview
 * Version: 2.0.0
 */

export default class Preview {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.document = null;

        this.visible = false;

        this.state = "CREATED";

    }

    render() {

        if (this.element) return this;

        this.element = document.createElement("div");

        this.element.className = "awc-preview";

        this.element.style.display = "none";

        document.body.appendChild(this.element);

        this.state = "RENDERED";

        return this;

    }

    setDocument(document) {

        this.document = document;

        return this.refresh();

    }

    refresh() {

        if (!this.element || !this.document) return this;

        this.element.innerHTML = "";

        const blocks = this.document.getBlocks
            ? this.document.getBlocks()
            : [];

        blocks.forEach(block => {

            const section = document.createElement("section");

            section.className = "awc-preview-block";

            section.dataset.id = block.id || "";

            section.innerHTML = `
                <h3>${block.title || block.type || "Block"}</h3>
                <div>${block.content?.text || ""}</div>
            `;

            this.element.appendChild(section);

        });

        return this;

    }

    show() {

        if (!this.element) {

            this.render();

        }

        this.refresh();

        this.element.style.display = "block";

        this.visible = true;

        this.app?.emit("preview:show");

        return this;

    }

    hide() {

        if (!this.element) return this;

        this.element.style.display = "none";

        this.visible = false;

        this.app?.emit("preview:hide");

        return this;

    }

    toggle() {

        return this.visible
            ? this.hide()
            : this.show();

    }

    clear() {

        if (this.element) {

            this.element.innerHTML = "";

        }

        return this;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

        this.document = null;

        this.visible = false;

        this.state = "DESTROYED";

    }

    getElement() {

        return this.element;

    }

    isVisible() {

        return this.visible;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            visible: this.visible,
            hasDocument: !!this.document
        };

    }

}


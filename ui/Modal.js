/**
 * Modal.js
 * Reusable Modal Component
 * Version: 2.0.0
 */

export default class Modal {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.overlay = null;

        this.visible = false;

        this.options = {
            title: "",
            content: "",
            closable: true
        };

        this.state = "CREATED";

    }

    render() {

        if (this.element) return this;

        this.overlay = document.createElement("div");

        this.overlay.className = "awc-modal-overlay";

        this.element = document.createElement("div");

        this.element.className = "awc-modal";

        this.overlay.appendChild(this.element);

        document.body.appendChild(this.overlay);

        this.overlay.style.display = "none";

        this.refresh();

        this.state = "RENDERED";

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = `
            <div class="awc-modal-header">
                <h3>${this.options.title}</h3>
                ${
                    this.options.closable
                    ? '<button class="awc-modal-close">&times;</button>'
                    : ''
                }
            </div>

            <div class="awc-modal-body">
                ${this.options.content}
            </div>
        `;

        const closeButton = this.element.querySelector(
            ".awc-modal-close"
        );

        if (closeButton) {

            closeButton.addEventListener("click", () => {

                this.close();

            });

        }

        return this;

    }

    open(options = {}) {

        this.options = {
            ...this.options,
            ...options
        };

        if (!this.element) {

            this.render();

        }

        this.refresh();

        this.overlay.style.display = "flex";

        this.visible = true;

        this.app?.emit("modal:open", this.options);

        return this;

    }

    close() {

        if (!this.overlay) return this;

        this.overlay.style.display = "none";

        this.visible = false;

        this.app?.emit("modal:close");

        return this;

    }

    toggle() {

        return this.visible
            ? this.close()
            : this.open();

    }

    setTitle(title) {

        this.options.title = title;

        this.refresh();

        return this;

    }

    setContent(content) {

        this.options.content = content;

        this.refresh();

        return this;

    }

    isOpen() {

        return this.visible;

    }

    destroy() {

        this.overlay?.remove();

        this.overlay = null;

        this.element = null;

        this.visible = false;

        this.state = "DESTROYED";

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            visible: this.visible,
            title: this.options.title
        };

    }

}


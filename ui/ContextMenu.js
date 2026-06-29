/**
 * ContextMenu.js
 * Context Menu Component
 * Version: 2.0.0
 */

export default class ContextMenu {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.items = [];

        this.visible = false;

        this.state = "CREATED";

    }

    render() {

        if (this.element) return this;

        this.element = document.createElement("div");

        this.element.className = "awc-context-menu";

        this.element.style.display = "none";

        document.body.appendChild(this.element);

        document.addEventListener("click", () => {

            if (this.visible) {

                this.hide();

            }

        });

        this.state = "RENDERED";

        return this;

    }

    setItems(items = []) {

        this.items = items;

        this.refresh();

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = "";

        this.items.forEach(item => {

            const button = document.createElement("button");

            button.className = "awc-context-item";

            button.textContent = item.label;

            button.addEventListener("click", () => {

                if (typeof item.action === "function") {

                    item.action();

                }

                this.app?.emit("contextmenu:select", item.id);

                this.hide();

            });

            this.element.appendChild(button);

        });

        return this;

    }

    show(x, y) {

        if (!this.element) {

            this.render();

        }

        this.refresh();

        this.element.style.left = `${x}px`;

        this.element.style.top = `${y}px`;

        this.element.style.display = "block";

        this.visible = true;

        this.app?.emit("contextmenu:show");

        return this;

    }

    hide() {

        if (!this.element) return this;

        this.element.style.display = "none";

        this.visible = false;

        this.app?.emit("contextmenu:hide");

        return this;

    }

    isVisible() {

        return this.visible;

    }

    clear() {

        this.items = [];

        this.refresh();

        return this;

    }

    destroy() {

        this.element?.remove();

        this.element = null;

        this.visible = false;

        this.state = "DESTROYED";

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            visible: this.visible,
            items: this.items.length
        };

    }

}


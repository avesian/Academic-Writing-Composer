/**
 * Dropdown.js
 * Reusable Dropdown Component
 * Version: 2.0.0
 */

export default class Dropdown {

    constructor(options = {}) {

        this.options = {
            label: "Menu",
            items: [],
            className: "",
            onSelect: null,
            ...options
        };

        this.element = null;

        this.button = null;

        this.menu = null;

        this.opened = false;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("div");

            this.button = document.createElement("button");

            this.menu = document.createElement("div");

            this.button.addEventListener("click", () => {

                this.toggle();

            });

            document.addEventListener("click", event => {

                if (
                    this.opened &&
                    !this.element.contains(event.target)
                ) {

                    this.close();

                }

            });

        }

        this.element.className = [
            "awc-dropdown",
            this.options.className
        ].filter(Boolean).join(" ");

        this.button.className = "awc-dropdown-button";

        this.button.type = "button";

        this.button.textContent = this.options.label;

        this.menu.className = "awc-dropdown-menu";

        this.menu.hidden = !this.opened;

        this.renderMenu();

        this.element.innerHTML = "";

        this.element.appendChild(this.button);

        this.element.appendChild(this.menu);

        this.state = "RENDERED";

        return this.element;

    }

    renderMenu() {

        this.menu.innerHTML = "";

        this.options.items.forEach(item => {

            const option = document.createElement("button");

            option.type = "button";

            option.className = "awc-dropdown-item";

            option.textContent = item.label;

            option.addEventListener("click", () => {

                this.select(item);

            });

            this.menu.appendChild(option);

        });

    }

    select(item) {

        if (typeof item.action === "function") {

            item.action(item);

        }

        if (typeof this.options.onSelect === "function") {

            this.options.onSelect(item);

        }

        this.close();

    }

    open() {

        this.opened = true;

        return this.refresh();

    }

    close() {

        this.opened = false;

        return this.refresh();

    }

    toggle() {

        this.opened = !this.opened;

        return this.refresh();

    }

    setItems(items = []) {

        this.options.items = items;

        return this.refresh();

    }

    refresh() {

        if (this.element) {

            this.render();

        }

        return this;

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            items: this.options.items.length,
            opened: this.opened,
            state: this.state
        };

    }

}


/**
 * Tabs.js
 * Reusable Tabs Component
 * Version: 2.0.0
 */

export default class Tabs {

    constructor(options = {}) {

        this.options = {
            items: [],
            active: 0,
            className: "",
            onChange: null,
            ...options
        };

        this.element = null;

        this.header = null;

        this.content = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("div");

            this.header = document.createElement("div");

            this.content = document.createElement("div");

            this.element.appendChild(this.header);

            this.element.appendChild(this.content);

        }

        this.element.className = [
            "awc-tabs",
            this.options.className
        ].filter(Boolean).join(" ");

        this.header.className = "awc-tabs-header";

        this.content.className = "awc-tabs-content";

        this.renderHeader();

        this.renderContent();

        this.state = "RENDERED";

        return this.element;

    }

    renderHeader() {

        this.header.innerHTML = "";

        this.options.items.forEach((item, index) => {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "awc-tab-button";

            if (index === this.options.active) {

                button.classList.add("active");

            }

            button.textContent = item.title || `Tab ${index + 1}`;

            button.addEventListener("click", () => {

                this.select(index);

            });

            this.header.appendChild(button);

        });

    }

    renderContent() {

        this.content.innerHTML = "";

        const active = this.options.items[this.options.active];

        if (!active) return;

        this.content.innerHTML = active.content || "";

    }

    select(index) {

        if (index < 0 || index >= this.options.items.length) {

            return this;

        }

        this.options.active = index;

        this.render();

        if (typeof this.options.onChange === "function") {

            this.options.onChange(index);

        }

        return this;

    }

    add(item) {

        this.options.items.push({
            title: "",
            content: "",
            ...item
        });

        return this.refresh();

    }

    remove(index) {

        this.options.items.splice(index, 1);

        if (this.options.active >= this.options.items.length) {

            this.options.active = Math.max(
                0,
                this.options.items.length - 1
            );

        }

        return this.refresh();

    }

    refresh() {

        if (this.element) {

            this.render();

        }

        return this;

    }

    getActive() {

        return this.options.active;

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            active: this.options.active,
            tabs: this.options.items.length,
            state: this.state
        };

    }

}


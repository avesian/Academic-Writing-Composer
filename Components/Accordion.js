```javascript id="a4n8kp"
/**
 * Accordion.js
 * Reusable Accordion Component
 * Version: 2.0.0
 */

export default class Accordion {

    constructor(options = {}) {

        this.options = {
            multiple: false,
            items: [],
            className: "",
            ...options
        };

        this.element = null;

        this.state = "CREATED";

    }

    render() {

        if (!this.element) {

            this.element = document.createElement("div");

        }

        this.element.className = [
            "awc-accordion",
            this.options.className
        ].filter(Boolean).join(" ");

        this.element.innerHTML = "";

        this.options.items.forEach((item, index) => {

            this.element.appendChild(
                this.createItem(item, index)
            );

        });

        this.state = "RENDERED";

        return this.element;

    }

    createItem(item, index) {

        const section = document.createElement("section");

        section.className = "awc-accordion-item";

        const header = document.createElement("button");

        header.type = "button";

        header.className = "awc-accordion-header";

        header.textContent = item.title || `Item ${index + 1}`;

        const body = document.createElement("div");

        body.className = "awc-accordion-body";

        body.innerHTML = item.content || "";

        body.hidden = !item.open;

        header.addEventListener("click", () => {

            this.toggle(index);

        });

        section.appendChild(header);

        section.appendChild(body);

        return section;

    }

    toggle(index) {

        if (!this.options.multiple) {

            this.options.items.forEach((item, i) => {

                item.open = i === index
                    ? !item.open
                    : false;

            });

        } else {

            this.options.items[index].open =
                !this.options.items[index].open;

        }

        this.render();

        return this;

    }

    add(item) {

        this.options.items.push({
            title: "",
            content: "",
            open: false,
            ...item
        });

        return this.refresh();

    }

    remove(index) {

        this.options.items.splice(index, 1);

        return this.refresh();

    }

    refresh() {

        if (this.element) {

            this.render();

        }

        return this;

    }

    getItems() {

        return [...this.options.items];

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
            multiple: this.options.multiple,
            state: this.state
        };

    }

}
```

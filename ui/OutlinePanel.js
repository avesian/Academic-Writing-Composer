/**
 * OutlinePanel.js
 * Document Outline Navigation
 * Version: 2.0.0
 */

export default class OutlinePanel {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.outline = [];

        this.active = null;

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-sidebar");

        if (!this.element) return this;

        this.refresh();

        this.state = "RENDERED";

        return this;

    }

    refresh() {

        if (!this.element) return this;

        this.element.innerHTML = "";

        const title = document.createElement("div");

        title.className = "awc-outline-title";

        title.textContent = "Document Outline";

        this.element.appendChild(title);

        const list = document.createElement("ul");

        list.className = "awc-outline-list";

        this.outline.forEach(item => {

            list.appendChild(this.createItem(item));

        });

        this.element.appendChild(list);

        return this;

    }

    createItem(item) {

        const li = document.createElement("li");

        li.className = "awc-outline-item";

        li.dataset.id = item.id;

        li.style.paddingLeft = `${(item.level - 1) * 20}px`;

        if (item.id === this.active) {
            li.classList.add("active");
        }

        li.textContent = item.title;

        li.addEventListener("click", () => {

            this.select(item.id);

        });

        return li;

    }

    load(document) {

        this.outline = [];

        if (!document?.getBlocks) {

            this.refresh();

            return this;

        }

        const blocks = document.getBlocks();

        blocks.forEach(block => {

            if (block.type === "chapter" || block.level) {

                this.outline.push({
                    id: block.id,
                    title: block.title || "Untitled",
                    level: block.level || 1
                });

            }

        });

        this.refresh();

        return this;

    }

    select(id) {

        this.active = id;

        this.refresh();

        this.app?.emit("outline:select", id);

        return this;

    }

    clear() {

        this.outline = [];

        this.active = null;

        this.refresh();

        return this;

    }

    getItems() {

        return [...this.outline];

    }

    getActive() {

        return this.active;

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
            totalItems: this.outline.length,
            active: this.active
        };

    }

}


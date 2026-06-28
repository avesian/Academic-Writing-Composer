```javascript
/**
 * Sidebar.js
 * Navigation Sidebar
 * Version: 2.0.0
 */

export default class Sidebar {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.items = [
            { id: "document", label: "Document", icon: "📄" },
            { id: "cover", label: "Cover", icon: "📘" },
            { id: "chapter", label: "Chapters", icon: "📑" },
            { id: "references", label: "References", icon: "📚" },
            { id: "appendix", label: "Appendix", icon: "📎" }
        ];

        this.active = "document";

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-sidebar");

        if (!this.element) return this;

        this.element.innerHTML = "";

        this.items.forEach(item => {

            this.element.appendChild(
                this.createItem(item)
            );

        });

        this.state = "RENDERED";

        return this;

    }

    createItem(item) {

        const button = document.createElement("button");

        button.className = "awc-sidebar-item";

        if (item.id === this.active) {
            button.classList.add("active");
        }

        button.dataset.id = item.id;

        button.innerHTML = `
            <span class="awc-sidebar-icon">${item.icon}</span>
            <span class="awc-sidebar-label">${item.label}</span>
        `;

        button.addEventListener("click", () => {

            this.select(item.id);

        });

        return button;

    }

    select(id) {

        this.active = id;

        this.render();

        this.app?.emit("sidebar:select", id);

        return this;

    }

    addItem(item) {

        this.items.push(item);

        this.render();

        return this;

    }

    removeItem(id) {

        this.items = this.items.filter(
            item => item.id !== id
        );

        this.render();

        return this;

    }

    getActive() {

        return this.active;

    }

    getItems() {

        return [...this.items];

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
            active: this.active,
            totalItems: this.items.length
        };

    }

}
```

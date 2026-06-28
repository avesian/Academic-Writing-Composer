```javascript id="gq2m8r"
/**
 * Toolbar.js
 * Main Toolbar
 * Version: 2.0.0
 */

export default class Toolbar {

    constructor(app = null) {

        this.app = app;

        this.element = null;

        this.tools = [
            { id: "new", label: "New", icon: "📄" },
            { id: "open", label: "Open", icon: "📂" },
            { id: "save", label: "Save", icon: "💾" },
            { id: "undo", label: "Undo", icon: "↶" },
            { id: "redo", label: "Redo", icon: "↷" },
            { id: "export", label: "Export", icon: "⬇" },
            { id: "preview", label: "Preview", icon: "👁" },
            { id: "settings", label: "Settings", icon: "⚙" }
        ];

        this.state = "CREATED";

    }

    render() {

        const workspace = this.app?.workspace?.getRootElement();

        if (!workspace) return this;

        this.element = workspace.querySelector(".awc-toolbar");

        if (!this.element) return this;

        this.element.innerHTML = "";

        this.tools.forEach(tool => {

            this.element.appendChild(
                this.createButton(tool)
            );

        });

        this.state = "RENDERED";

        return this;

    }

    createButton(tool) {

        const button = document.createElement("button");

        button.className = "awc-tool-button";

        button.dataset.action = tool.id;

        button.title = tool.label;

        button.innerHTML = `
            <span class="awc-tool-icon">${tool.icon}</span>
            <span class="awc-tool-label">${tool.label}</span>
        `;

        button.addEventListener("click", () => {

            this.handleAction(tool.id);

        });

        return button;

    }

    handleAction(action) {

        this.app?.emit(`toolbar:${action}`);

    }

    addTool(tool) {

        this.tools.push(tool);

        this.render();

        return this;

    }

    removeTool(id) {

        this.tools = this.tools.filter(
            tool => tool.id !== id
        );

        this.render();

        return this;

    }

    enable(id) {

        const button = this.element?.querySelector(
            `[data-action="${id}"]`
        );

        if (button) button.disabled = false;

    }

    disable(id) {

        const button = this.element?.querySelector(
            `[data-action="${id}"]`
        );

        if (button) button.disabled = true;

    }

    getElement() {

        return this.element;

    }

    getTools() {

        return [...this.tools];

    }

    getState() {

        return this.state;

    }

    toJSON() {

        return {
            state: this.state,
            totalTools: this.tools.length
        };

    }

}
```

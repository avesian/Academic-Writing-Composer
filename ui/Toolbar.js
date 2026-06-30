/**
 * Toolbar.js
 * Academic Writing Composer
 * Main Toolbar
 */

export default class Toolbar {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.buttons = [];

        this.state = "CREATED";

    }

    render() {

        if (this.element) {
            return this.element;
        }

        this.element = document.createElement("div");

        this.element.className = "awc-toolbar";

        this.createButtons();

        this.state = "READY";

        return this.element;

    }

    createButtons() {

        const actions = [
            ["New", "document:new"],
            ["Open", "document:open"],
            ["Save", "document:save"],
            ["Undo", "history:undo"],
            ["Redo", "history:redo"],
            ["Preview", "preview:open"],
            ["Export", "export:open"],
            ["Theme", "theme:toggle"]
        ];

        for (const [label, event] of actions) {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "awc-button";

            button.textContent = label;

            button.dataset.event = event;

            button.addEventListener("click", () => {

                this.app.emit(event);

            });

            this.buttons.push(button);

            this.element.appendChild(button);

        }

    }

    findButton(label) {

        return this.buttons.find(

            button => button.textContent === label

        ) ?? null;

    }

    enable(label) {

        const button = this.findButton(label);

        if (button) {
            button.disabled = false;
        }

    }

    disable(label) {

        const button = this.findButton(label);

        if (button) {
            button.disabled = true;
        }

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}


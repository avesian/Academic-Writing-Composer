```javascript id="t6kp9d"
/**
 * Toolbar.js
 * Academic Writing Composer
 * Main Toolbar
 */

export default class Toolbar {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.state = "CREATED";

        this.buttons = [];

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("div");

        this.element.className = "awc-toolbar";

        this.createButtons();

        this.state = "RENDERED";

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

        actions.forEach(([label, event]) => {

            const button = document.createElement("button");

            button.className = "awc-button";

            button.type = "button";

            button.textContent = label;

            button.addEventListener("click", () => {

                this.app.emit(event);

            });

            this.buttons.push(button);

            this.element.appendChild(button);

        });

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

    findButton(label) {

        return this.buttons.find(

            button => button.textContent === label

        );

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}
```

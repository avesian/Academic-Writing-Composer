```javascript id="k7qx2v"
/**
 * Canvas.js
 * Academic Writing Composer
 * Document Canvas
 */

export default class Canvas {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.page = null;

        this.editor = null;

        this.state = "CREATED";

    }

    render() {

        if (this.element) {

            return this.element;

        }

        this.element = document.createElement("section");

        this.element.className = "awc-canvas";

        this.page = document.createElement("div");

        this.page.className = "awc-page";

        this.editor = document.createElement("div");

        this.editor.className = "awc-editor";

        this.editor.contentEditable = "true";

        this.editor.spellcheck = false;

        this.editor.innerHTML = `
            <h1>Academic Writing Composer</h1>

            <p>
                Mulai menulis dokumen Anda di sini...
            </p>
        `;

        this.page.appendChild(this.editor);

        this.element.appendChild(this.page);

        this.bindEvents();

        this.state = "RENDERED";

        return this.element;

    }

    bindEvents() {

        this.editor.addEventListener("input", () => {

            this.app.emit(
                "document:changed",
                this.getContent()
            );

        });

        this.app.on(

            "document:new",

            () => this.newDocument()

        );

        this.app.on(

            "document:set",

            content => this.setContent(content)

        );

    }

    newDocument() {

        this.editor.innerHTML = `
            <h1>Untitled Document</h1>

            <p></p>
        `;

        this.app.emit("document:created");

    }

    setContent(content = "") {

        this.editor.innerHTML = content;

    }

    getContent() {

        return this.editor.innerHTML;

    }

    focus() {

        this.editor.focus();

    }

    clear() {

        this.editor.innerHTML = "";

    }

    getEditor() {

        return this.editor;

    }

    getPage() {

        return this.page;

    }

    getElement() {

        return this.element;

    }

    getState() {

        return this.state;

    }

}
```

```javascript
/**
 * Canvas.js
 * Academic Writing Composer
 */

import DocumentEditor from "../editor/DocumentEditor.js";

export default class Canvas {

    constructor(app) {

        this.app = app;

        this.element = null;

        this.page = null;

        this.editor = null;

        this.documentEditor = null;

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
        this.editor.contentEditable = true;
        this.editor.spellcheck = false;

        this.page.appendChild(this.editor);
        this.element.appendChild(this.page);

        this.documentEditor = new DocumentEditor(this.app);

        this.bindEvents();

        if (typeof this.documentEditor.newDocument === "function") {
            this.documentEditor.newDocument();
        }

        this.refresh();

        this.state = "READY";

        return this.element;

    }

    bindEvents() {

        this.editor.addEventListener("input", () => {

            if (!this.documentEditor) {
                return;
            }

            this.documentEditor.setContent(this.editor.innerHTML);

            this.app.emit(
                "document:changed",
                this.documentEditor.getDocument()
            );

        });

        this.app.on("document:new", () => {

            this.documentEditor.newDocument();

            this.refresh();

        });

        this.app.on("document:open", document => {

            this.documentEditor.open(document);

            this.refresh();

        });

        this.app.on("document:save", () => {

            this.documentEditor.save();

        });

        this.app.on("document:refresh", () => {

            this.refresh();

        });

    }

    refresh() {

        if (!this.documentEditor) {
            return;
        }

        if (typeof this.documentEditor.renderHTML === "function") {

            this.editor.innerHTML =
                this.documentEditor.renderHTML();

        }

    }

    focus() {

        this.editor.focus();

    }

    getEditor() {

        return this.documentEditor;

    }

    getContent() {

        return this.documentEditor?.getDocument() ?? null;

    }

    getElement() {

        return this.element;

    }

}
```

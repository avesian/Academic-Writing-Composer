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

        this.page.appendChild(this.editor);

        this.element.appendChild(this.page);

        this.documentEditor = new DocumentEditor(this.app);

        this.bindEvents();

        this.documentEditor.newDocument();

        this.refresh();

        return this.element;

    }

    bindEvents() {

        this.app.on("block:add", type => {

            this.documentEditor.addBlock(type);

            this.refresh();

        });

        this.app.on("document:new", () => {

            this.documentEditor.newDocument();

            this.refresh();

        });

        this.app.on("document:refresh", () => {

            this.refresh();

        });

    }

    refresh() {

        this.editor.innerHTML =

            this.documentEditor.renderHTML();

    }

    getEditor() {

        return this.documentEditor;

    }

}

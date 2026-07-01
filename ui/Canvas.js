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

        console.log("Canvas.render()");

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

        this.page.appendChild(this.editor);

        this.element.appendChild(this.page);

        this.documentEditor = new DocumentEditor(this.app);

        console.log("DocumentEditor created");

        this.bindEvents();

        this.documentEditor.newDocument();

        this.refresh();

        return this.element;

    }

    bindEvents() {

        console.log("Canvas.bindEvents()");

        this.editor.addEventListener("input", () => {

            this.documentEditor.setContent(
                this.editor.innerHTML
            );

        });

        this.app.on("block:add", type => {

            console.log("BLOCK EVENT:", type);

            const block = this.documentEditor.addBlock(type);

            console.log("BLOCK =", block);

            console.log(
                "TOTAL BLOCKS =",
                this.documentEditor
                    .getDocument()
                    .getBlocks()
                    .length
            );

            this.refresh();

        });

        this.app.on("document:new", () => {

            console.log("DOCUMENT NEW");

            this.documentEditor.newDocument();

            this.refresh();

        });

        this.app.on("document:refresh", () => {

            console.log("DOCUMENT REFRESH");

            this.refresh();

        });

    }

    refresh() {

        console.log("Canvas.refresh()");

        const html = this.documentEditor.renderHTML();

        console.log(html);

        this.editor.innerHTML = html;

    }

    getEditor() {

        return this.documentEditor;

    }

}

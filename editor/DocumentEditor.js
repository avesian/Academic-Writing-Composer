/**
 * DocumentEditor.js
 * Academic Writing Composer
 */

import DocumentComposer from "./DocumentComposer.js";
import DocumentRenderer from "./DocumentRenderer.js";

export default class DocumentEditor {

    constructor(app) {

        this.app = app;

        this.composer = new DocumentComposer();

        this.renderer = new DocumentRenderer();

        this.state = "READY";

    }

    newDocument(template = null) {

        const document = this.composer.newDocument(template);

        this.app?.emit(
            "document:created",
            document
        );

        return document;

    }

    open(data) {

        const document = this.composer.importJSON(data);

        this.app?.emit(
            "document:opened",
            document
        );

        return document;

    }

    save() {

        const json = this.composer.exportJSON();

        this.app?.emit(
            "document:saved",
            json
        );

        return json;

    }

    setContent(html) {

        this.composer.setContent(html);

        this.app?.emit(
            "document:changed",
            html
        );

    }

    getContent() {

        return this.composer.getContent();

    }

    getDocument() {

        return this.composer.getDocument();

    }

    renderHTML() {

        this.renderer.setDocument(
            this.composer.getDocument()
        );

        return this.renderer.render();

    }

    exportJSON() {

        return this.composer.exportJSON();

    }

    importJSON(data) {

        const document = this.composer.importJSON(data);

        this.app?.emit(
            "document:updated",
            document
        );

        return document;

    }

    addBlock(type, data = {}) {

        return this.composer.addBlock(
            type,
            data
        );

    }

    removeBlock(id) {

        return this.composer.removeBlock(id);

    }

    updateBlock(id, data = {}) {

        return this.composer.updateBlock(
            id,
            data
        );

    }

    moveBlock(fromIndex, toIndex) {

        return this.composer.moveBlock(
            fromIndex,
            toIndex
        );

    }

    clear() {

        return this.composer.clear();

    }

}

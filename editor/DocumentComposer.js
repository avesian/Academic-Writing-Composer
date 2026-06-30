/**
 * DocumentComposer.js
 * Academic Writing Composer
 */

import AcademicDocument from "../AcademicDocument.js";
import TemplateManager from "../templates/TemplateManager.js";

export default class DocumentComposer {

    constructor(document = null) {

        this.document = document instanceof AcademicDocument
            ? document
            : new AcademicDocument();

        this.templates = new TemplateManager();

    }

    newDocument(template = null) {

        this.document = new AcademicDocument();

        if (template) {

            this.templates.apply(
                template,
                this.document
            );

        }

        return this.document;

    }

    open(data) {

        this.document = new AcademicDocument();

        this.document.fromJSON(data);

        return this.document;

    }

    getDocument() {

        return this.document;

    }

    addBlock(type, data = {}) {

        return this.document.addBlock(type, data);

    }

    removeBlock(id) {

        this.document.removeBlock(id);

        return this;

    }

    updateBlock(id, data = {}) {

        const block = this.document.getBlock(id);

        if (!block) {

            return null;

        }

        Object.assign(block, data);

        this.document.touch();

        return block;

    }

    moveBlock(fromIndex, toIndex) {

        const blocks = this.document.getBlocks();

        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= blocks.length ||
            toIndex >= blocks.length
        ) {

            return false;

        }

        const [block] = blocks.splice(fromIndex, 1);

        blocks.splice(toIndex, 0, block);

        this.document.touch();

        return true;

    }

    applyTemplate(name) {

        this.templates.apply(
            name,
            this.document
        );

        return this.document;

    }

    clear() {

        this.document.clear();

        return this;

    }

    setMetadata(metadata = {}) {

        this.document.setMetadata(metadata);

        return this;

    }

    getMetadata() {

        return this.document.getMetadata();

    }

    setContent(html) {

        this.document.setContent(html);

        return this;

    }

    getContent() {

        return this.document.getContent();

    }

    exportJSON() {

        return this.document.toJSON();

    }

    importJSON(data) {

        this.document.fromJSON(data);

        return this.document;

    }

}

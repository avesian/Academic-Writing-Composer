/**
 * DocumentComposer.js
 * Academic Writing Composer
 * Document Composition Engine
 */

import AcademicDocument from "../AcademicDocument.js";

export default class DocumentComposer {

    constructor(document = null) {

        this.document = document instanceof AcademicDocument
            ? document
            : new AcademicDocument();

    }

    /**
     * Create New Document
     */
    newDocument() {

        this.document = new AcademicDocument();

        return this.document;

    }

    /**
     * Open Existing Document
     */
    open(data) {

        this.document = new AcademicDocument();

        this.document.fromJSON(data);

        return this.document;

    }

    /**
     * Get Active Document
     */
    getDocument() {

        return this.document;

    }

    /**
     * Add Block
     */
    addBlock(type, data = {}) {

        return this.document.addBlock(type, data);

    }

    /**
     * Remove Block
     */
    removeBlock(id) {

        this.document.removeBlock(id);

        return this;

    }

    /**
     * Update Block
     */
    updateBlock(id, data = {}) {

        const block = this.document.getBlock(id);

        if (!block) {

            return null;

        }

        Object.assign(block, data);

        this.document.touch();

        return block;

    }

    /**
     * Move Block
     */
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

    /**
     * Clear Document
     */
    clear() {

        this.document.clear();

        return this;

    }

    /**
     * Metadata
     */
    setMetadata(metadata = {}) {

        Object.assign(
            this.document.metadata,
            metadata
        );

        this.document.touch();

        return this;

    }

    getMetadata() {

        return this.document.metadata;

    }

    /**
     * Content
     */
    setContent(html) {

        this.document.setContent(html);

        return this;

    }

    getContent() {

        return this.document.getContent();

    }

    /**
     * Export
     */
    exportJSON() {

        return this.document.toJSON();

    }

    /**
     * Import
     */
    importJSON(data) {

        this.document.fromJSON(data);

        return this.document;

    }

}


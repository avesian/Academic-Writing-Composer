/**
 * Composer.js
 * Composer Engine
 * Version: 1.0.0
 */

export default class Composer {
    constructor() {
        this.document = null;
        this.template = null;
        this.state = "IDLE";
    }

    /**
     * Load AcademicDocument
     */
    load(document) {
        this.document = document;
        return this;
    }

    /**
     * Load Template
     */
    loadTemplate(template) {
        this.template = template;
        return this;
    }

    /**
     * Compose Document
     */
    compose() {
        if (!this.document) {
            throw new Error("AcademicDocument not loaded.");
        }

        this.state = "COMPOSING";

        // Sort block berdasarkan urutan
        this.document.sortBlocks();

        // Compose setiap block
        for (const block of this.document.getBlocks()) {
            if (!block.enabled) continue;

            if (typeof block.initialize === "function") {
                block.initialize(this.document);
            }

            if (typeof block.compose === "function") {
                block.compose(this.document);
            }
        }

        this.document.setState("COMPOSED");

        this.state = "COMPLETED";

        return this.document;
    }

    /**
     * Insert Block
     */
    insertBlock(block) {
        this.document.addBlock(block);
        return this;
    }

    /**
     * Remove Block
     */
    removeBlock(id) {
        this.document.removeBlock(id);
        return this;
    }

    /**
     * Move Block
     */
    moveBlock(id, newOrder) {
        const block = this.document.getBlock(id);

        if (!block) return this;

        block.order = newOrder;

        this.document.sortBlocks();

        return this;
    }

    /**
     * Enable Block
     */
    enableBlock(id) {
        const block = this.document.getBlock(id);

        if (block) {
            block.enable();
        }

        return this;
    }

    /**
     * Disable Block
     */
    disableBlock(id) {
        const block = this.document.getBlock(id);

        if (block) {
            block.disable();
        }

        return this;
    }

    /**
     * Rebuild Document
     */
    rebuild() {
        return this.compose();
    }

    /**
     * Reset Composer
     */
    reset() {
        this.document = null;
        this.template = null;
        this.state = "IDLE";
    }

    /**
     * Current State
     */
    getState() {
        return this.state;
    }
}

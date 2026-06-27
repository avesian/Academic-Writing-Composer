/**
 * Renderer.js
 * Base Renderer
 * Version: 1.0.0
 */

export default class Renderer {
    constructor() {
        this.document = null;
        this.template = null;

        this.state = "IDLE";

        this.output = null;

        this.errors = [];
        this.warnings = [];
    }

    /**
     * Load AcademicDocument
     */
    load(document) {
        this.document = document;
        this.state = "LOADED";

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
     * Render Document
     */
    render() {
        if (!this.document) {
            throw new Error("AcademicDocument not loaded.");
        }

        this.state = "RENDERING";

        this.beginDocument();

        const blocks = this.document.getBlocks();

        for (const block of blocks) {

            if (!block.enabled) continue;

            this.renderBlock(block);

        }

        this.endDocument();

        this.document.setState("RENDERED");

        this.state = "RENDERED";

        return this.output;
    }

    /**
     * Begin Document
     */
    beginDocument() {}

    /**
     * Render Block
     * Override pada renderer turunan.
     */
    renderBlock(block) {}

    /**
     * End Document
     */
    endDocument() {}

    /**
     * Save Output
     */
    save(filename = "document") {
        return this.output;
    }

    /**
     * Download Output
     */
    download(filename = "document") {
        return this.output;
    }

    /**
     * Output
     */
    setOutput(output) {
        this.output = output;

        return this;
    }

    getOutput() {
        return this.output;
    }

    /**
     * Reset
     */
    reset() {
        this.document = null;
        this.template = null;

        this.output = null;

        this.errors = [];
        this.warnings = [];

        this.state = "IDLE";

        return this;
    }

    /**
     * Errors
     */
    addError(message) {
        this.errors.push(message);

        return this;
    }

    getErrors() {
        return this.errors;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    /**
     * Warnings
     */
    addWarning(message) {
        this.warnings.push(message);

        return this;
    }

    getWarnings() {
        return this.warnings;
    }

    hasWarnings() {
        return this.warnings.length > 0;
    }

    /**
     * State
     */
    getState() {
        return this.state;
    }

    /**
     * Export
     */
    toJSON() {
        return {
            state: this.state,
            output: this.output,
            errors: this.errors,
            warnings: this.warnings
        };
    }
}

/**
 * Formatter.js
 * Base Formatter
 * Version: 1.0.0
 */

export default class Formatter {
    constructor() {
        this.document = null;
        this.template = null;
        this.state = "IDLE";
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
     * Format Document
     */
    format() {
        if (!this.document) {
            throw new Error("AcademicDocument not loaded.");
        }

        this.state = "FORMATTING";

        this.formatMetadata();
        this.formatBlocks();
        this.formatAssets();
        this.formatStatistics();

        this.document.setState("FORMATTED");

        this.state = "FORMATTED";

        return this.document;
    }

    /**
     * Format Metadata
     * Override pada turunan jika diperlukan.
     */
    formatMetadata() {
        return this;
    }

    /**
     * Format Blocks
     */
    formatBlocks() {
        const blocks = this.document.getBlocks();

        for (const block of blocks) {
            if (!block.enabled) continue;

            if (typeof block.format === "function") {
                block.format(this.document, this.template);
            }
        }

        return this;
    }

    /**
     * Format Assets
     */
    formatAssets() {
        return this;
    }

    /**
     * Format Statistics
     */
    formatStatistics() {
        return this;
    }

    /**
     * Reset
     */
    reset() {
        this.document = null;
        this.template = null;
        this.state = "IDLE";
        this.errors = [];
        this.warnings = [];

        return this;
    }

    /**
     * State
     */
    setState(state) {
        this.state = state;
        return this;
    }

    getState() {
        return this.state;
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
     * Export
     */
    toJSON() {
        return {
            state: this.state,
            template: this.template,
            errors: this.errors,
            warnings: this.warnings
        };
    }
}

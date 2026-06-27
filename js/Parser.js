/**
 * Parser.js
 * Base Parser
 * Version: 1.0.0
 */

export default class Parser {
    constructor() {
        this.document = null;
        this.source = null;
        this.state = "IDLE";
        this.result = null;
        this.errors = [];
        this.warnings = [];
    }

    /**
     * Load Source
     */
    load(source) {
        this.source = source;
        this.state = "LOADED";

        return this;
    }

    /**
     * Parse Source
     * Override pada parser turunan.
     */
    async parse() {
        throw new Error("parse() must be implemented.");
    }

    /**
     * Parse Metadata
     */
    async parseMetadata() {
        return {};
    }

    /**
     * Parse Blocks
     */
    async parseBlocks() {
        return [];
    }

    /**
     * Parse Assets
     */
    async parseAssets() {
        return {};
    }

    /**
     * Validate Source
     */
    validate() {
        return true;
    }

    /**
     * Reset Parser
     */
    reset() {
        this.document = null;
        this.source = null;
        this.result = null;
        this.errors = [];
        this.warnings = [];
        this.state = "IDLE";

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
     * Result
     */
    setResult(result) {
        this.result = result;
        return this;
    }

    getResult() {
        return this.result;
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
     * Status
     */
    isReady() {
        return this.state === "READY";
    }

    isLoaded() {
        return this.state === "LOADED";
    }

    isParsed() {
        return this.state === "PARSED";
    }

    /**
     * Export
     */
    toJSON() {
        return {
            state: this.state,
            source: this.source,
            result: this.result,
            errors: this.errors,
            warnings: this.warnings
        };
    }
}

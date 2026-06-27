/**
 * Validator.js
 * Base Validator
 * Version: 1.0.0
 */

export default class Validator {
    constructor() {
        this.document = null;
        this.template = null;

        this.state = "IDLE";

        this.report = {
            score: 100,
            passed: true,
            warnings: [],
            errors: [],
            summary: ""
        };
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
     * Validate Document
     */
    validate() {
        if (!this.document) {
            throw new Error("AcademicDocument not loaded.");
        }

        this.state = "VALIDATING";

        this.report = {
            score: 100,
            passed: true,
            warnings: [],
            errors: [],
            summary: ""
        };

        this.validateMetadata();
        this.validateBlocks();
        this.validateAssets();
        this.validateStatistics();

        this.calculateScore();

        this.document.setState("VALIDATED");

        this.state = "VALIDATED";

        return this.report;
    }

    /**
     * Metadata Validation
     */
    validateMetadata() {
        return this;
    }

    /**
     * Block Validation
     */
    validateBlocks() {
        const blocks = this.document.getBlocks();

        for (const block of blocks) {
            if (!block.enabled) continue;

            if (typeof block.validate !== "function") continue;

            const result = block.validate(this.document);

            if (!result) continue;

            if (result.errors?.length) {
                this.report.errors.push(...result.errors);
            }

            if (result.warnings?.length) {
                this.report.warnings.push(...result.warnings);
            }
        }

        return this;
    }

    /**
     * Asset Validation
     */
    validateAssets() {
        return this;
    }

    /**
     * Statistics Validation
     */
    validateStatistics() {
        return this;
    }

    /**
     * Calculate Score
     */
    calculateScore() {
        const errorPenalty = this.report.errors.length * 10;
        const warningPenalty = this.report.warnings.length * 2;

        this.report.score = Math.max(
            0,
            100 - errorPenalty - warningPenalty
        );

        this.report.passed = this.report.errors.length === 0;

        this.report.summary =
            this.report.passed
                ? "Validation completed successfully."
                : "Validation completed with errors.";

        return this;
    }

    /**
     * Reset
     */
    reset() {
        this.document = null;
        this.template = null;

        this.state = "IDLE";

        this.report = {
            score: 100,
            passed: true,
            warnings: [],
            errors: [],
            summary: ""
        };

        return this;
    }

    /**
     * Report
     */
    getReport() {
        return this.report;
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
            report: this.report
        };
    }
}

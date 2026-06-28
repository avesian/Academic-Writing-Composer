/**
 * AcademicComposer.js
 * Main Academic Document Composer
 * Version: 1.0.0
 */

export default class AcademicComposer {
    constructor({
        document = null,
        blockRegistry = null,
        templateRegistry = null,
        renderer = null,
        validator = null
    } = {}) {

        this.document = document;

        this.blockRegistry = blockRegistry;
        this.templateRegistry = templateRegistry;

        this.renderer = renderer;
        this.validator = validator;

        this.template = null;

        this.state = "IDLE";

        this.report = {
            composed: false,
            rendered: false,
            validated: false,
            errors: [],
            warnings: []
        };
    }

    /**
     * Load Template
     */
    useTemplate(templateId) {
        if (!this.templateRegistry) {
            throw new Error("TemplateRegistry not available.");
        }

        this.template = this.templateRegistry.get(templateId);

        if (!this.template) {
            throw new Error(`Template '${templateId}' not found.`);
        }

        return this;
    }

    /**
     * Set Renderer
     */
    setRenderer(renderer) {
        this.renderer = renderer;
        return this;
    }

    /**
     * Set Validator
     */
    setValidator(validator) {
        this.validator = validator;
        return this;
    }

    /**
     * Set Document
     */
    setDocument(document) {
        this.document = document;
        return this;
    }

    /**
     * Compose Entire Document
     */
    compose() {

        if (!this.document) {
            throw new Error("AcademicDocument is required.");
        }

        this.state = "COMPOSING";

        const blocks = this.document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            if (typeof block.initialize === "function") {
                block.initialize(this.document);
            }

            if (typeof block.compose === "function") {
                block.compose(this.document);
            }
        }

        this.report.composed = true;
        this.state = "COMPOSED";

        return this.document;
    }

    /**
     * Validate
     */
    validate() {

        if (!this.validator) {
            return true;
        }

        this.state = "VALIDATING";

        const result = this.validator.validate(this.document);

        this.report.validated = true;

        if (result?.errors) {
            this.report.errors.push(...result.errors);
        }

        if (result?.warnings) {
            this.report.warnings.push(...result.warnings);
        }

        this.state = "VALIDATED";

        return result;
    }

    /**
     * Render
     */
    render() {

        if (!this.renderer) {
            throw new Error("Renderer not configured.");
        }

        this.state = "RENDERING";

        this.renderer.beginDocument();

        const blocks = this.document.getBlocks();

        for (const block of blocks) {

            if (!block.enabled) continue;

            block.render(this.renderer);

        }

        const output = this.renderer.endDocument();

        this.report.rendered = true;

        this.state = "RENDERED";

        return output;
    }

    /**
     * Full Pipeline
     */
    build() {

        this.compose();

        this.validate();

        return this.render();

    }

    /**
     * Reset
     */
    reset() {

        this.state = "IDLE";

        this.report = {
            composed: false,
            rendered: false,
            validated: false,
            errors: [],
            warnings: []
        };

        return this;
    }

    /**
     * Status
     */
    getState() {
        return this.state;
    }

    getReport() {
        return this.report;
    }

    getDocument() {
        return this.document;
    }

    getTemplate() {
        return this.template;
    }

    /**
     * Export
     */
    toJSON() {
        return {
            state: this.state,
            template: this.template,
            report: this.report
        };
    }
}

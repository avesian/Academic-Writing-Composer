/**
 * Block.js
 * Base Block Class
 * Version: 1.0.0
 */

export default class Block {
    constructor(options = {}) {
        this.id = options.id || this.generateId();

        this.type = options.type || "block";

        this.title = options.title || "";

        this.category = options.category || "main";

        this.order = options.order || 0;

        this.enabled = options.enabled ?? true;

        this.settings = options.settings || {};

        this.content = options.content || {};

        this.state = "NEW";

        this.errors = [];

        this.warnings = [];

        this.createdAt = new Date();

        this.updatedAt = new Date();
    }

    /* ======================================================
       Lifecycle
    ====================================================== */

    initialize(document) {
        this.state = "INITIALIZED";
        this.touch();
    }

    compose(document) {
        this.state = "COMPOSED";
        this.touch();
    }

    validate(document) {
        this.state = "VALIDATED";

        return {
            valid: this.errors.length === 0,
            warnings: this.warnings,
            errors: this.errors
        };
    }

    render(renderer) {
        this.state = "RENDERED";
        this.touch();
    }

    export() {
        return this.toJSON();
    }

    /* ======================================================
       Content
    ====================================================== */

    setContent(content = {}) {
        this.content = content;
        this.touch();
    }

    getContent() {
        return this.content;
    }

    /* ======================================================
       Settings
    ====================================================== */

    setSettings(settings = {}) {
        this.settings = {
            ...this.settings,
            ...settings
        };

        this.touch();
    }

    getSettings() {
        return this.settings;
    }

    /* ======================================================
       State
    ====================================================== */

    setState(state) {
        this.state = state;
        this.touch();
    }

    getState() {
        return this.state;
    }

    /* ======================================================
       Validation
    ====================================================== */

    addError(message) {
        this.errors.push(message);
    }

    addWarning(message) {
        this.warnings.push(message);
    }

    clearValidation() {
        this.errors = [];
        this.warnings = [];
    }

    /* ======================================================
       Enable / Disable
    ====================================================== */

    enable() {
        this.enabled = true;
        this.touch();
    }

    disable() {
        this.enabled = false;
        this.touch();
    }

    isEnabled() {
        return this.enabled;
    }

    /* ======================================================
       Helpers
    ====================================================== */

    touch() {
        this.updatedAt = new Date();
    }

    generateId() {
        return (
            "BLK-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 8)
        );
    }

    clone() {
        return new Block(JSON.parse(JSON.stringify(this.toJSON())));
    }

    /* ======================================================
       Serialization
    ====================================================== */

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            category: this.category,
            order: this.order,
            enabled: this.enabled,
            settings: this.settings,
            content: this.content,
            state: this.state,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromJSON(data) {
        return new Block(data);
    }
}

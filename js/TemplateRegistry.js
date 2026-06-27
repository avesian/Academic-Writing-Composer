/**
 * TemplateRegistry.js
 * Template Registry
 * Version: 1.0.0
 */

export default class TemplateRegistry {
    constructor() {
        this.templates = new Map();
        this.activeTemplate = null;
    }

    /**
     * Register Template
     */
    register(template) {
        if (!template.id) {
            throw new Error("Template must have an id.");
        }

        this.templates.set(template.id, template);

        return this;
    }

    /**
     * Unregister Template
     */
    unregister(id) {
        this.templates.delete(id);

        if (this.activeTemplate?.id === id) {
            this.activeTemplate = null;
        }

        return this;
    }

    /**
     * Get Template
     */
    get(id) {
        return this.templates.get(id) || null;
    }

    /**
     * Set Active Template
     */
    use(id) {
        const template = this.get(id);

        if (!template) {
            throw new Error(`Template "${id}" is not registered.`);
        }

        this.activeTemplate = template;

        return template;
    }

    /**
     * Get Active Template
     */
    current() {
        return this.activeTemplate;
    }

    /**
     * Check Template
     */
    has(id) {
        return this.templates.has(id);
    }

    /**
     * Get All Templates
     */
    all() {
        return [...this.templates.values()];
    }

    /**
     * Get Template IDs
     */
    ids() {
        return [...this.templates.keys()];
    }

    /**
     * Count
     */
    count() {
        return this.templates.size;
    }

    /**
     * Clear Registry
     */
    clear() {
        this.templates.clear();
        this.activeTemplate = null;

        return this;
    }
}

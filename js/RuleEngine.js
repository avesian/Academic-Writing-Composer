/**
 * RuleEngine.js
 * Academic Writing Composer
 */

export default class RuleEngine {

    constructor(rules = {}) {

        this.rules = rules;

    }

    load(rules = {}) {

        this.rules = rules;

        return this;

    }

    get(key, fallback = null) {

        return this.rules[key] ?? fallback;

    }

    has(key) {

        return key in this.rules;

    }

    set(key, value) {

        this.rules[key] = value;

        return this;

    }

    validate(document) {

        const errors = [];

        if (!document.getMetadata().title) {

            errors.push({
                field: "title",
                message: "Document title is required."
            });

        }

        if (document.getBlocks().length === 0) {

            errors.push({
                field: "blocks",
                message: "Document contains no blocks."
            });

        }

        return errors;

    }

}

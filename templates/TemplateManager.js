/**
 * TemplateManager.js
 * Academic Writing Composer
 */

import ThesisTemplate from "./ThesisTemplate.js";

export default class TemplateManager {

    constructor() {

        this.templates = new Map();

        this.register(
            "thesis",
            new ThesisTemplate()
        );

    }

    register(name, template) {

        this.templates.set(name, template);

        return this;

    }

    unregister(name) {

        this.templates.delete(name);

        return this;

    }

    has(name) {

        return this.templates.has(name);

    }

    get(name) {

        return this.templates.get(name) || null;

    }

    apply(name, document) {

        const template = this.get(name);

        if (!template) {

            throw new Error(
                `Template "${name}" not found.`
            );

        }

        return template.build(document);

    }

    list() {

        return [...this.templates.keys()];

    }

}

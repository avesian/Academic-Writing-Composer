/**
 * MottoBlock.js
 * Motto Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class MottoBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "motto",
            title: "Motto",
            category: "frontmatter",
            order: options.order ?? 5,
            enabled: options.enabled ?? true,
            settings: options.settings || {},
            content: {}
        });
    }

    initialize(document) {
        super.initialize(document);
        return this;
    }

    compose(document) {
        super.compose(document);

        const metadata = document.getMetadata();

        this.content = {
            title: "MOTTO",

            author: metadata.author,

            mottos: [],

            notes: ""
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.mottos.length === 0) {
            this.addWarning("No motto has been added.");
        }

        return super.validate();
    }

    addMotto(text, source = "") {
        this.content.mottos.push({
            text,
            source
        });

        return this;
    }

    updateMotto(index, text, source = "") {
        if (index >= 0 && index < this.content.mottos.length) {
            this.content.mottos[index] = {
                text,
                source
            };
        }

        return this;
    }

    removeMotto(index) {
        if (index >= 0 && index < this.content.mottos.length) {
            this.content.mottos.splice(index, 1);
        }

        return this;
    }

    clearMottos() {
        this.content.mottos = [];
        return this;
    }

    setNotes(notes) {
        this.content.notes = notes;
        return this;
    }

    render(renderer) {
        super.render(renderer);

        if (renderer && typeof renderer.renderBlock === "function") {
            return renderer.renderBlock(this);
        }

        return this.content;
    }

    export() {
        return {
            ...this.toJSON(),
            content: this.content
        };
    }
}

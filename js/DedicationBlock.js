/**
 * DedicationBlock.js
 * Dedication Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class DedicationBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "dedication",
            title: "Dedication",
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
            title: "Dedication",

            author: metadata.author,

            dedication: "",

            quotes: [],

            notes: ""
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (!this.content.dedication) {
            this.addWarning("Dedication text is empty.");
        }

        return super.validate();
    }

    setDedication(text) {
        this.content.dedication = text;
        return this;
    }

    addQuote(text, author = "") {
        this.content.quotes.push({
            text,
            author
        });

        return this;
    }

    removeQuote(index) {
        if (index >= 0 && index < this.content.quotes.length) {
            this.content.quotes.splice(index, 1);
        }

        return this;
    }

    clearQuotes() {
        this.content.quotes = [];
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

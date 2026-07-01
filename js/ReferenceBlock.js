/**
 * ReferenceBlock.js
 * Reference Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class ReferenceBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "reference",
            title: "References",
            category: "backmatter",
            order: options.order ?? 900,
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

        this.content = {
            title: "DAFTAR PUSTAKA",

            style: "APA 7",

            references: [],

            generatedAt: new Date(),

            totalReferences: 0,

            sortBy: "author"
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.references.length === 0) {
            this.addWarning("Reference list is empty.");
        }

        return super.validate();
    }

    addReference(reference) {
        this.content.references.push(reference);
        this.content.totalReferences = this.content.references.length;

        return this;
    }

    removeReference(index) {
        if (index >= 0 && index < this.content.references.length) {
            this.content.references.splice(index, 1);
            this.content.totalReferences = this.content.references.length;
        }

        return this;
    }

    updateReference(index, reference) {
        if (index >= 0 && index < this.content.references.length) {
            this.content.references[index] = reference;
        }

        return this;
    }

    clearReferences() {
        this.content.references = [];
        this.content.totalReferences = 0;

        return this;
    }

    setStyle(style) {
        this.content.style = style;
        return this;
    }

    sortReferences() {
        this.content.references.sort((a, b) => {
            const authorA = (a.author || "").toLowerCase();
            const authorB = (b.author || "").toLowerCase();

            if (authorA < authorB) return -1;
            if (authorA > authorB) return 1;
            return 0;
        });

        return this;
    }

    importReferences(references = []) {
        this.content.references = [...references];
        this.content.totalReferences = this.content.references.length;

        return this;
    }

    exportReferences() {
        return this.content.references;
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

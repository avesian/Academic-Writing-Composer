/**
 * PrefaceBlock.js
 * Preface Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class PrefaceBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "preface",
            title: "Preface",
            category: "frontmatter",
            order: options.order ?? 8,
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
            title: "KATA PENGANTAR",

            documentTitle: metadata.title,

            author: metadata.author,

            nim: metadata.nim,

            studyProgram: metadata.studyProgram,

            faculty: metadata.faculty,

            university: metadata.university,

            city: metadata.city,

            date: "",

            text: "",

            acknowledgements: [],

            closing: "Penulis"
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (!this.content.text) {
            this.addError("Preface text is required.");
        }

        if (!this.content.author) {
            this.addError("Author is required.");
        }

        return super.validate();
    }

    setText(text) {
        this.content.text = text;
        return this;
    }

    addAcknowledgement(name, description = "") {
        this.content.acknowledgements.push({
            name,
            description
        });

        return this;
    }

    removeAcknowledgement(index) {
        if (index >= 0 && index < this.content.acknowledgements.length) {
            this.content.acknowledgements.splice(index, 1);
        }

        return this;
    }

    clearAcknowledgements() {
        this.content.acknowledgements = [];
        return this;
    }

    setDate(date) {
        this.content.date = date;
        return this;
    }

    setClosing(closing) {
        this.content.closing = closing;
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

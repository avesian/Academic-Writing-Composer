/**
 * AppendixBlock.js
 * Appendix Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class AppendixBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "appendix",
            title: "Appendix",
            category: "backmatter",
            order: options.order ?? 1000,
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
            title: "LAMPIRAN",

            appendices: [],

            generatedAt: new Date(),

            totalAppendices: 0
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.appendices.length === 0) {
            this.addWarning("No appendices found.");
        }

        return super.validate();
    }

    addAppendix(appendix) {
        this.content.appendices.push(appendix);
        this.content.totalAppendices = this.content.appendices.length;

        return this;
    }

    removeAppendix(index) {
        if (index >= 0 && index < this.content.appendices.length) {
            this.content.appendices.splice(index, 1);
            this.content.totalAppendices = this.content.appendices.length;
        }

        return this;
    }

    updateAppendix(index, appendix) {
        if (index >= 0 && index < this.content.appendices.length) {
            this.content.appendices[index] = appendix;
        }

        return this;
    }

    clearAppendices() {
        this.content.appendices = [];
        this.content.totalAppendices = 0;

        return this;
    }

    getAppendix(index) {
        return this.content.appendices[index] || null;
    }

    getAppendices() {
        return this.content.appendices;
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

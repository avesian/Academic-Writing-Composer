/**
 * TocBlock.js
 * Table of Contents Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class TocBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "toc",
            title: "Table of Contents",
            category: "frontmatter",
            order: options.order ?? 9,
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
            title: "DAFTAR ISI",

            entries: [],

            generatedAt: new Date(),

            totalEntries: 0
        };

        const blocks = document.getBlocks();

        for (const block of blocks) {

            if (!block.enabled) continue;

            if (block.type === "toc") continue;

            this.content.entries.push({
                id: block.id,
                type: block.type,
                title: block.title,
                level: 1,
                page: null
            });

        }

        this.content.totalEntries = this.content.entries.length;

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.entries.length === 0) {
            this.addWarning("Table of contents is empty.");
        }

        return super.validate();
    }

    addEntry(entry) {
        this.content.entries.push(entry);
        this.content.totalEntries = this.content.entries.length;

        return this;
    }

    removeEntry(index) {
        if (index >= 0 && index < this.content.entries.length) {
            this.content.entries.splice(index, 1);
            this.content.totalEntries = this.content.entries.length;
        }

        return this;
    }

    clearEntries() {
        this.content.entries = [];
        this.content.totalEntries = 0;

        return this;
    }

    updatePage(id, page) {
        const entry = this.content.entries.find(item => item.id === id);

        if (entry) {
            entry.page = page;
        }

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

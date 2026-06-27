/**
 * ListTableBlock.js
 * List of Tables Block
 * Version: 1.0.0
 */

import Block from "../core/Block.js";

export default class ListTableBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "list-table",
            title: "List of Tables",
            category: "frontmatter",
            order: options.order ?? 11,
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
            title: "DAFTAR TABEL",

            tables: [],

            generatedAt: new Date(),

            totalTables: 0
        };

        const blocks = document.getBlocks();

        for (const block of blocks) {

            if (!block.enabled) continue;

            const content = block.getContent
                ? block.getContent()
                : block.content;

            if (!content) continue;

            if (Array.isArray(content.tables)) {

                content.tables.forEach((table, index) => {

                    this.content.tables.push({
                        id: table.id || `${block.id}-table-${index + 1}`,
                        number: table.number || this.content.tables.length + 1,
                        caption: table.caption || "",
                        page: table.page || null,
                        blockId: block.id
                    });

                });

            }

        }

        this.content.totalTables = this.content.tables.length;

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.tables.length === 0) {
            this.addWarning("No tables found.");
        }

        return super.validate();
    }

    addTable(table) {
        this.content.tables.push(table);
        this.content.totalTables = this.content.tables.length;

        return this;
    }

    removeTable(index) {
        if (index >= 0 && index < this.content.tables.length) {
            this.content.tables.splice(index, 1);
            this.content.totalTables = this.content.tables.length;
        }

        return this;
    }

    clearTables() {
        this.content.tables = [];
        this.content.totalTables = 0;

        return this;
    }

    updatePage(id, page) {
        const table = this.content.tables.find(item => item.id === id);

        if (table) {
            table.page = page;
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

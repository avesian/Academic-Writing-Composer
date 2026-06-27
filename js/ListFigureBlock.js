/**
 * ListFigureBlock.js
 * List of Figures Block
 * Version: 1.0.0
 */

import Block from "../core/Block.js";

export default class ListFigureBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "list-figure",
            title: "List of Figures",
            category: "frontmatter",
            order: options.order ?? 10,
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
            title: "DAFTAR GAMBAR",

            figures: [],

            generatedAt: new Date(),

            totalFigures: 0
        };

        const blocks = document.getBlocks();

        for (const block of blocks) {

            if (!block.enabled) continue;

            const content = block.getContent
                ? block.getContent()
                : block.content;

            if (!content) continue;

            if (Array.isArray(content.figures)) {

                content.figures.forEach((figure, index) => {

                    this.content.figures.push({
                        id: figure.id || `${block.id}-figure-${index + 1}`,
                        number: figure.number || this.content.figures.length + 1,
                        caption: figure.caption || "",
                        page: figure.page || null,
                        blockId: block.id
                    });

                });

            }

        }

        this.content.totalFigures = this.content.figures.length;

        return this;
    }

    validate() {
        this.clearValidation();

        if (this.content.figures.length === 0) {
            this.addWarning("No figures found.");
        }

        return super.validate();
    }

    addFigure(figure) {
        this.content.figures.push(figure);
        this.content.totalFigures = this.content.figures.length;

        return this;
    }

    removeFigure(index) {
        if (index >= 0 && index < this.content.figures.length) {
            this.content.figures.splice(index, 1);
            this.content.totalFigures = this.content.figures.length;
        }

        return this;
    }

    clearFigures() {
        this.content.figures = [];
        this.content.totalFigures = 0;

        return this;
    }

    updatePage(id, page) {
        const figure = this.content.figures.find(item => item.id === id);

        if (figure) {
            figure.page = page;
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

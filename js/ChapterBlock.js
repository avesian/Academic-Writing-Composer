/**
 * ChapterBlock.js
 * Chapter Block
 * Version: 1.0.0
 */

import Block from "../core/Block.js";

export default class ChapterBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "chapter",
            title: options.title || "BAB",
            category: "body",
            order: options.order ?? 100,
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
            chapterNumber: options?.chapterNumber || 1,

            chapterTitle: this.title,

            sections: [],

            figures: [],

            tables: [],

            equations: [],

            citations: [],

            footnotes: [],

            paragraphs: [],

            pageStart: null,

            pageEnd: null
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (!this.content.chapterTitle) {
            this.addError("Chapter title is required.");
        }

        if (this.content.sections.length === 0) {
            this.addWarning("Chapter has no sections.");
        }

        return super.validate();
    }

    setChapter(number, title) {
        this.content.chapterNumber = number;
        this.content.chapterTitle = title;

        return this;
    }

    addSection(section) {
        this.content.sections.push(section);
        return this;
    }

    addParagraph(text) {
        this.content.paragraphs.push(text);
        return this;
    }

    addFigure(figure) {
        this.content.figures.push(figure);
        return this;
    }

    addTable(table) {
        this.content.tables.push(table);
        return this;
    }

    addEquation(equation) {
        this.content.equations.push(equation);
        return this;
    }

    addCitation(citation) {
        this.content.citations.push(citation);
        return this;
    }

    addFootnote(footnote) {
        this.content.footnotes.push(footnote);
        return this;
    }

    clearSections() {
        this.content.sections = [];
        return this;
    }

    clearParagraphs() {
        this.content.paragraphs = [];
        return this;
    }

    clearFigures() {
        this.content.figures = [];
        return this;
    }

    clearTables() {
        this.content.tables = [];
        return this;
    }

    clearEquations() {
        this.content.equations = [];
        return this;
    }

    clearCitations() {
        this.content.citations = [];
        return this;
    }

    clearFootnotes() {
        this.content.footnotes = [];
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

/**
 * AbstractEnglishBlock.js
 * English Abstract Block
 * Version: 1.0.0
 */

import Block from "./block/Block.js";

export default class AbstractEnglishBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "abstract-en",
            title: "Abstract (English)",
            category: "frontmatter",
            order: options.order ?? 7,
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
            title: "ABSTRACT",

            documentTitle: metadata.title,

            author: metadata.author,

            nim: metadata.nim,

            studyProgram: metadata.studyProgram,

            language: "en",

            text: "",

            keywords: [],

            wordCount: 0
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (!this.content.documentTitle) {
            this.addError("Document title is required.");
        }

        if (!this.content.author) {
            this.addError("Author is required.");
        }

        if (!this.content.text) {
            this.addError("English abstract text is required.");
        }

        if (this.content.keywords.length === 0) {
            this.addWarning("English keywords are empty.");
        }

        return super.validate();
    }

    setText(text) {
        this.content.text = text;
        this.content.wordCount = this.countWords(text);

        return this;
    }

    addKeyword(keyword) {
        if (!this.content.keywords.includes(keyword)) {
            this.content.keywords.push(keyword);
        }

        return this;
    }

    removeKeyword(keyword) {
        this.content.keywords =
            this.content.keywords.filter(item => item !== keyword);

        return this;
    }

    clearKeywords() {
        this.content.keywords = [];
        return this;
    }

    setLanguage(language = "en") {
        this.content.language = language;
        return this;
    }

    countWords(text) {
        if (!text) return 0;

        return text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;
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

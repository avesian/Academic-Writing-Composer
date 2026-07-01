/**
 * DocxParser.js
 * DOCX Parser
 * Version: 1.0.0
 */

import Parser from "./Parser.js";
import AcademicDocument from "./AcademicDocument.js";

export default class DocxParser extends Parser {
    constructor(options = {}) {
        super();

        this.type = "docx";

        this.options = {
            extractMetadata: true,
            extractImages: true,
            extractTables: true,
            extractStyles: true,
            ...options
        };
    }

    /**
     * Parse DOCX
     */
    async parse(source = this.source) {
        if (!source) {
            throw new Error("DOCX source not loaded.");
        }

        this.load(source);

        this.state = "PARSING";

        const metadata = await this.parseMetadata();
        const blocks = await this.parseBlocks();
        const assets = await this.parseAssets();

        const document = new AcademicDocument();

        if (typeof document.setMetadata === "function") {
            document.setMetadata(metadata);
        }

        if (typeof document.setAssets === "function") {
            document.setAssets(assets);
        }

        if (typeof document.addBlock === "function") {
            blocks.forEach(block => document.addBlock(block));
        }

        this.document = document;
        this.result = document;

        this.state = "PARSED";

        return document;
    }

    /**
     * Parse Metadata
     */
    async parseMetadata() {
        return {
            title: "",
            subtitle: "",
            author: "",
            nim: "",
            studyProgram: "",
            faculty: "",
            university: "",
            degree: "",
            city: "",
            year: "",
            language: "id"
        };
    }

    /**
     * Parse Blocks
     */
    async parseBlocks() {
        return [];
    }

    /**
     * Parse Assets
     */
    async parseAssets() {
        return {
            images: [],
            tables: [],
            logos: [],
            attachments: []
        };
    }

    /**
     * Validate DOCX
     */
    validate() {
        return !!this.source;
    }

    /**
     * Options
     */
    setOptions(options = {}) {
        this.options = {
            ...this.options,
            ...options
        };

        return this;
    }

    getOptions() {
        return this.options;
    }

    /**
     * Source
     */
    getSource() {
        return this.source;
    }

    /**
     * Document
     */
    getDocument() {
        return this.document;
    }

    /**
     * Export
     */
    toJSON() {
        return {
            type: this.type,
            state: this.state,
            options: this.options,
            source: this.source,
            result: this.result
        };
    }
}

/**
 * DocxRenderer.js
 * DOCX Renderer
 * Version: 1.0.0
 */

import Renderer from "./Renderer.js";

export default class DocxRenderer extends Renderer {
    constructor(options = {}) {
        super();

        this.type = "docx";

        this.options = {
            pageSize: "A4",
            orientation: "portrait",
            margins: {
                top: 4,
                left: 4,
                right: 3,
                bottom: 3
            },
            ...options
        };

        this.output = {
            metadata: {},
            sections: []
        };

        this.currentSection = null;
    }

    beginDocument() {
        this.output = {
            metadata: {
                format: "docx",
                createdAt: new Date(),
                pageSize: this.options.pageSize,
                orientation: this.options.orientation
            },
            sections: []
        };

        return this;
    }

    renderBlock(block) {
        const section = {
            id: block.id,
            type: block.type,
            title: block.title,
            category: block.category,
            content: block.getContent
                ? block.getContent()
                : block.content
        };

        this.output.sections.push(section);

        this.currentSection = section;

        return section;
    }

    endDocument() {
        this.output.metadata.totalSections =
            this.output.sections.length;

        return this.output;
    }

    addPageBreak() {
        this.output.sections.push({
            type: "page-break"
        });

        return this;
    }

    addSectionBreak() {
        this.output.sections.push({
            type: "section-break"
        });

        return this;
    }

    setPageNumber(number) {
        if (this.currentSection) {
            this.currentSection.pageNumber = number;
        }

        return this;
    }

    setHeader(header) {
        this.output.metadata.header = header;

        return this;
    }

    setFooter(footer) {
        this.output.metadata.footer = footer;

        return this;
    }

    setMargins(margins) {
        this.options.margins = {
            ...this.options.margins,
            ...margins
        };

        return this;
    }

    setPageSize(size) {
        this.options.pageSize = size;

        return this;
    }

    setOrientation(orientation) {
        this.options.orientation = orientation;

        return this;
    }

    save(filename = "document.docx") {
        return {
            filename,
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            data: this.output
        };
    }

    download(filename = "document.docx") {
        return this.save(filename);
    }

    export() {
        return this.output;
    }

    toJSON() {
        return {
            type: this.type,
            options: this.options,
            output: this.output
        };
    }
}

/**
 * PdfRenderer.js
 * PDF Renderer
 * Version: 1.0.0
 */

import Renderer from "./Renderer.js";

export default class PdfRenderer extends Renderer {
    constructor(options = {}) {
        super();

        this.type = "pdf";

        this.options = {
            pageSize: "A4",
            orientation: "portrait",
            margins: {
                top: 4,
                left: 4,
                right: 3,
                bottom: 3
            },
            font: {
                family: "Times New Roman",
                size: 12,
                lineHeight: 2
            },
            ...options
        };

        this.output = {
            metadata: {},
            pages: []
        };

        this.currentPage = null;
    }

    beginDocument() {
        this.output = {
            metadata: {
                format: "pdf",
                createdAt: new Date(),
                pageSize: this.options.pageSize,
                orientation: this.options.orientation,
                font: this.options.font
            },
            pages: []
        };

        this.addPage();

        return this;
    }

    renderBlock(block) {
        const page = {
            id: block.id,
            type: block.type,
            title: block.title,
            category: block.category,
            content: block.getContent
                ? block.getContent()
                : block.content
        };

        this.output.pages.push(page);

        this.currentPage = page;

        return page;
    }

    endDocument() {
        this.output.metadata.totalPages =
            this.output.pages.length;

        return this.output;
    }

    addPage() {
        this.currentPage = {
            type: "page",
            content: []
        };

        this.output.pages.push(this.currentPage);

        return this;
    }

    addPageBreak() {
        return this.addPage();
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

    setFont(font) {
        this.options.font = {
            ...this.options.font,
            ...font
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

    save(filename = "document.pdf") {
        return {
            filename,
            mimeType: "application/pdf",
            data: this.output
        };
    }

    download(filename = "document.pdf") {
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

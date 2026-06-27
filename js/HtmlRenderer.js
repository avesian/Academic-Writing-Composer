/**
 * HtmlRenderer.js
 * HTML Renderer
 * Version: 1.0.0
 */

import Renderer from "../core/Renderer.js";

export default class HtmlRenderer extends Renderer {
    constructor(options = {}) {
        super();

        this.type = "html";

        this.options = {
            language: "id",
            theme: "default",
            pageClass: "academic-document",
            ...options
        };

        this.output = "";
    }

    beginDocument() {
        this.output = `<!DOCTYPE html>
<html lang="${this.options.language}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Academic Document</title>
</head>
<body class="${this.options.pageClass}">
`;

        return this;
    }

    renderBlock(block) {
        const content = block.getContent
            ? block.getContent()
            : block.content;

        this.output += `
<section
    id="${block.id}"
    class="block block-${block.type}">
<h2>${block.title}</h2>
<pre>${this.escapeHTML(JSON.stringify(content, null, 2))}</pre>
</section>
`;

        return this;
    }

    endDocument() {
        this.output += `
</body>
</html>
`;

        return this.output;
    }

    escapeHTML(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    setLanguage(language) {
        this.options.language = language;
        return this;
    }

    setTheme(theme) {
        this.options.theme = theme;
        return this;
    }

    setPageClass(className) {
        this.options.pageClass = className;
        return this;
    }

    save(filename = "document.html") {
        return {
            filename,
            mimeType: "text/html",
            data: this.output
        };
    }

    download(filename = "document.html") {
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

/**
 * PaginationEngine.js
 * Automatic Pagination Engine
 * Version: 1.0.0
 */

export default class PaginationEngine {
    constructor(options = {}) {
        this.options = {
            frontMatterStyle: "roman-lower",
            bodyStyle: "decimal",
            appendixStyle: "decimal",
            startBodyPage: 1,
            ...options
        };

        this.reset();
    }

    reset() {
        this.frontMatterPage = 1;
        this.bodyPage = this.options.startBodyPage;
        this.appendixPage = 1;

        this.currentSection = "frontmatter";

        return this;
    }

    paginate(document) {

        this.reset();

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            this.detectSection(block);

            const page = this.nextPage();

            if (typeof block.setPage === "function") {
                block.setPage(page);
            }

            if (block.content) {
                block.content.page = page;
            }

        }

        return document;
    }

    detectSection(block) {

        switch (block.category) {

            case "frontmatter":
                this.currentSection = "frontmatter";
                break;

            case "body":
                this.currentSection = "body";
                break;

            case "backmatter":
                this.currentSection = "appendix";
                break;

        }

    }

    nextPage() {

        switch (this.currentSection) {

            case "frontmatter":
                return this.toRoman(this.frontMatterPage++);

            case "body":
                return this.bodyPage++;

            case "appendix":
                return this.bodyPage++;

            default:
                return this.bodyPage++;

        }

    }

    toRoman(number) {

        const romans = [
            ["M",1000],["CM",900],["D",500],["CD",400],
            ["C",100],["XC",90],["L",50],["XL",40],
            ["X",10],["IX",9],["V",5],["IV",4],["I",1]
        ];

        let result = "";
        let n = number;

        for (const [symbol,value] of romans) {

            while (n >= value) {
                result += symbol;
                n -= value;
            }

        }

        return result.toLowerCase();

    }

    renumber(document) {
        return this.paginate(document);
    }

    getCurrentPage() {

        switch (this.currentSection) {

            case "frontmatter":
                return this.frontMatterPage;

            case "body":
                return this.bodyPage;

            default:
                return this.bodyPage;

        }

    }

    getState() {
        return {
            currentSection: this.currentSection,
            frontMatterPage: this.frontMatterPage,
            bodyPage: this.bodyPage
        };
    }

    export() {
        return this.getState();
    }

    toJSON() {
        return {
            options: this.options,
            state: this.getState()
        };
    }
}


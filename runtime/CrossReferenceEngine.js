```javascript id="cr3f8a"
/**
 * CrossReferenceEngine.js
 * Automatic Cross Reference Engine
 * Version: 1.0.0
 */

export default class CrossReferenceEngine {

    constructor(options = {}) {

        this.options = {
            tablePrefix: "Tabel",
            figurePrefix: "Gambar",
            chapterPrefix: "BAB",
            equationPrefix: "Persamaan",
            ...options
        };

        this.index = {
            chapters: new Map(),
            sections: new Map(),
            tables: new Map(),
            figures: new Map(),
            equations: new Map()
        };

    }

    build(document) {

        this.clear();

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        blocks.forEach(block => {

            if (!block.enabled) return;

            this.indexBlock(block);

        });

        return this.index;

    }

    indexBlock(block) {

        if (block.type === "chapter") {

            this.index.chapters.set(block.id, {
                id: block.id,
                title: block.content.chapterTitle,
                number: block.content.chapterNumber,
                page: block.content.page
            });

            this.indexSections(block);
            this.indexTables(block);
            this.indexFigures(block);
            this.indexEquations(block);

        }

    }

    indexSections(block) {

        if (!Array.isArray(block.content.sections)) return;

        block.content.sections.forEach(section => {

            this.index.sections.set(section.id, {
                id: section.id,
                number: section.number,
                title: section.title,
                page: section.page || block.content.page
            });

        });

    }

    indexTables(block) {

        if (!Array.isArray(block.content.tables)) return;

        block.content.tables.forEach(table => {

            this.index.tables.set(table.id, {
                id: table.id,
                number: table.number,
                caption: table.caption,
                page: table.page || block.content.page
            });

        });

    }

    indexFigures(block) {

        if (!Array.isArray(block.content.figures)) return;

        block.content.figures.forEach(figure => {

            this.index.figures.set(figure.id, {
                id: figure.id,
                number: figure.number,
                caption: figure.caption,
                page: figure.page || block.content.page
            });

        });

    }

    indexEquations(block) {

        if (!Array.isArray(block.content.equations)) return;

        block.content.equations.forEach(equation => {

            this.index.equations.set(equation.id, {
                id: equation.id,
                number: equation.number,
                page: equation.page || block.content.page
            });

        });

    }

    getChapter(id) {

        return this.index.chapters.get(id) || null;

    }

    getSection(id) {

        return this.index.sections.get(id) || null;

    }

    getTable(id) {

        return this.index.tables.get(id) || null;

    }

    getFigure(id) {

        return this.index.figures.get(id) || null;

    }

    getEquation(id) {

        return this.index.equations.get(id) || null;

    }

    createReference(type, id) {

        const map = this.index[`${type}s`];

        if (!map) return null;

        const item = map.get(id);

        if (!item) return null;

        switch (type) {

            case "chapter":
                return `${this.options.chapterPrefix} ${item.number}`;

            case "table":
                return `${this.options.tablePrefix} ${item.number}`;

            case "figure":
                return `${this.options.figurePrefix} ${item.number}`;

            case "equation":
                return `${this.options.equationPrefix} ${item.number}`;

            case "section":
                return item.number;

            default:
                return null;

        }

    }

    clear() {

        this.index = {
            chapters: new Map(),
            sections: new Map(),
            tables: new Map(),
            figures: new Map(),
            equations: new Map()
        };

        return this;

    }

    export() {

        return {
            chapters: [...this.index.chapters.values()],
            sections: [...this.index.sections.values()],
            tables: [...this.index.tables.values()],
            figures: [...this.index.figures.values()],
            equations: [...this.index.equations.values()]
        };

    }

    toJSON() {

        return this.export();

    }

}
```

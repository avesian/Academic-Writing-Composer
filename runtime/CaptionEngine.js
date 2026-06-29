/**
 * CaptionEngine.js
 * Automatic Caption Engine
 * Version: 1.0.0
 */

export default class CaptionEngine {

    constructor(options = {}) {

        this.options = {
            tablePrefix: "Tabel",
            figurePrefix: "Gambar",
            resetPerChapter: true,
            ...options
        };

        this.reset();

    }

    reset() {

        this.currentChapter = 0;

        this.tableCounter = 0;

        this.figureCounter = 0;

        return this;

    }

    generate(document) {

        this.reset();

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            if (block.type === "chapter") {

                this.currentChapter++;

                if (this.options.resetPerChapter) {

                    this.tableCounter = 0;
                    this.figureCounter = 0;

                }

                this.processTables(block);

                this.processFigures(block);

            }

        }

        return document;

    }

    processTables(block) {

        if (!Array.isArray(block.content.tables)) return;

        block.content.tables.forEach(table => {

            this.tableCounter++;

            table.number =
                `${this.currentChapter}.${this.tableCounter}`;

            table.label =
                `${this.options.tablePrefix} ${table.number}`;

            table.caption =
                table.caption || "";

        });

    }

    processFigures(block) {

        if (!Array.isArray(block.content.figures)) return;

        block.content.figures.forEach(figure => {

            this.figureCounter++;

            figure.number =
                `${this.currentChapter}.${this.figureCounter}`;

            figure.label =
                `${this.options.figurePrefix} ${figure.number}`;

            figure.caption =
                figure.caption || "";

        });

    }

    renumber(document) {

        return this.generate(document);

    }

    getState() {

        return {
            chapter: this.currentChapter,
            tables: this.tableCounter,
            figures: this.figureCounter
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


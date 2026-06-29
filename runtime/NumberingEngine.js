/**
 * NumberingEngine.js
 * Automatic Numbering Engine
 * Version: 1.0.0
 */

export default class NumberingEngine {

    constructor(options = {}) {

        this.options = {
            chapterPrefix: "BAB",
            tablePrefix: "Tabel",
            figurePrefix: "Gambar",
            equationPrefix: "",
            resetPerChapter: true,
            ...options
        };

        this.reset();

    }

    reset() {

        this.chapter = 0;

        this.section = 0;

        this.subsection = 0;

        this.table = 0;

        this.figure = 0;

        this.equation = 0;

        return this;

    }

    number(document) {

        this.reset();

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            if (block.type === "chapter") {

                this.numberChapter(block);

            }

        }

        return document;

    }

    numberChapter(block) {

        this.chapter++;

        this.section = 0;
        this.subsection = 0;

        if (this.options.resetPerChapter) {

            this.table = 0;
            this.figure = 0;
            this.equation = 0;

        }

        block.content.chapterNumber = this.chapter;
        block.content.chapterLabel =
            `${this.options.chapterPrefix} ${this.toRoman(this.chapter)}`;

        this.numberSections(block);
        this.numberTables(block);
        this.numberFigures(block);
        this.numberEquations(block);

    }

    numberSections(block) {

        if (!Array.isArray(block.content.sections)) return;

        block.content.sections.forEach(section => {

            this.section++;

            section.number = `${this.chapter}.${this.section}`;

            if (!Array.isArray(section.children)) return;

            let subsection = 0;

            section.children.forEach(child => {

                subsection++;

                child.number =
                    `${this.chapter}.${this.section}.${subsection}`;

            });

        });

    }

    numberTables(block) {

        if (!Array.isArray(block.content.tables)) return;

        block.content.tables.forEach(table => {

            this.table++;

            table.number =
                `${this.chapter}.${this.table}`;

            table.label =
                `${this.options.tablePrefix} ${table.number}`;

        });

    }

    numberFigures(block) {

        if (!Array.isArray(block.content.figures)) return;

        block.content.figures.forEach(figure => {

            this.figure++;

            figure.number =
                `${this.chapter}.${this.figure}`;

            figure.label =
                `${this.options.figurePrefix} ${figure.number}`;

        });

    }

    numberEquations(block) {

        if (!Array.isArray(block.content.equations)) return;

        block.content.equations.forEach(equation => {

            this.equation++;

            equation.number =
                `${this.chapter}.${this.equation}`;

        });

    }

    toRoman(number) {

        const romans = [
            ["M",1000],["CM",900],["D",500],["CD",400],
            ["C",100],["XC",90],["L",50],["XL",40],
            ["X",10],["IX",9],["V",5],["IV",4],["I",1]
        ];

        let result = "";

        let value = number;

        for (const [roman, decimal] of romans) {

            while (value >= decimal) {

                result += roman;

                value -= decimal;

            }

        }

        return result;

    }

    getState() {

        return {
            chapter: this.chapter,
            section: this.section,
            table: this.table,
            figure: this.figure,
            equation: this.equation
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


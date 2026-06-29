/**
 * ValidationEngine.js
 * Academic Document Validation Engine
 * Version: 1.0.0
 */

export default class ValidationEngine {

    constructor(options = {}) {

        this.options = {
            requireTitle: true,
            requireAbstract: true,
            requireEnglishAbstract: true,
            requireReferences: true,
            minimumReferences: 20,
            minimumChapters: 5,
            maximumTitleLength: 200,
            maximumAbstractWords: 250,
            ...options
        };

        this.reset();

    }

    reset() {

        this.report = {
            valid: true,
            score: 100,
            errors: [],
            warnings: [],
            infos: []
        };

        return this;

    }

    validate(document) {

        this.reset();

        const blocks = document.getBlocks();

        this.validateMetadata(document);

        this.validateBlocks(blocks);

        this.validateReferences(blocks);

        this.validateAbstract(blocks);

        this.validateChapters(blocks);

        this.calculateScore();

        return this.report;

    }

    validateMetadata(document) {

        const metadata = document.metadata || {};

        if (
            this.options.requireTitle &&
            !metadata.title
        ) {

            this.error("Judul karya ilmiah belum diisi.");

        }

        if (
            metadata.title &&
            metadata.title.length > this.options.maximumTitleLength
        ) {

            this.warning("Judul terlalu panjang.");

        }

    }

    validateBlocks(blocks) {

        const required = [
            "cover",
            "approval",
            "abstract",
            "preface",
            "toc",
            "reference"
        ];

        required.forEach(type => {

            const found = blocks.find(
                block => block.enabled && block.type === type
            );

            if (!found) {

                this.error(`Block '${type}' belum tersedia.`);

            }

        });

    }

    validateAbstract(blocks) {

        const abstract = blocks.find(
            block => block.type === "abstract"
        );

        if (
            this.options.requireAbstract &&
            !abstract
        ) {

            this.error("Abstrak belum tersedia.");

        }

        if (abstract) {

            const text =
                abstract.content?.text || "";

            const words =
                text.trim().split(/\s+/).filter(Boolean);

            if (
                words.length >
                this.options.maximumAbstractWords
            ) {

                this.warning(
                    `Abstrak melebihi ${this.options.maximumAbstractWords} kata.`
                );

            }

        }

        if (this.options.requireEnglishAbstract) {

            const english = blocks.find(
                block => block.type === "abstract-en"
            );

            if (!english) {

                this.error("Abstract Bahasa Inggris belum tersedia.");

            }

        }

    }

    validateReferences(blocks) {

        const reference = blocks.find(
            block => block.type === "reference"
        );

        if (!reference) {

            this.error("Daftar pustaka belum tersedia.");

            return;

        }

        const total =
            reference.content?.references?.length || 0;

        if (
            this.options.requireReferences &&
            total === 0
        ) {

            this.error("Daftar pustaka masih kosong.");

        }

        if (
            total > 0 &&
            total < this.options.minimumReferences
        ) {

            this.warning(
                `Jumlah referensi kurang dari ${this.options.minimumReferences}.`
            );

        }

    }

    validateChapters(blocks) {

        const chapters = blocks.filter(
            block => block.type === "chapter"
        );

        if (
            chapters.length <
            this.options.minimumChapters
        ) {

            this.warning(
                `Jumlah BAB kurang dari ${this.options.minimumChapters}.`
            );

        }

    }

    calculateScore() {

        this.report.score -=
            this.report.errors.length * 10;

        this.report.score -=
            this.report.warnings.length * 2;

        if (this.report.score < 0) {

            this.report.score = 0;

        }

        this.report.valid =
            this.report.errors.length === 0;

    }

    error(message) {

        this.report.errors.push(message);

    }

    warning(message) {

        this.report.warnings.push(message);

    }

    info(message) {

        this.report.infos.push(message);

    }

    getReport() {

        return this.report;

    }

    export() {

        return this.report;

    }

    toJSON() {

        return this.report;

    }

}


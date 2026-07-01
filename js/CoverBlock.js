/**
 * CoverBlock.js
 * Cover Block
 * Version: 1.0.0
 */

import Block from "./Block.js";

export default class CoverBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "cover",
            title: "Cover",
            category: "frontmatter",
            order: options.order ?? 1,
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
        const institution = document.getInstitution();

        this.content = {
            title: metadata.title,
            subtitle: metadata.subtitle,
            author: metadata.author,
            nim: metadata.nim,
            studyProgram: metadata.studyProgram,
            faculty: metadata.faculty,
            university: metadata.university,
            degree: metadata.degree,
            city: metadata.city,
            year: metadata.year,
            language: metadata.language,

            institutionId: institution.id,
            institutionName: institution.name,

            logo: document.assets.logo
        };

        return this;
    }

    validate() {
        this.clearValidation();

        if (!this.content.title) {
            this.addError("Title is required.");
        }

        if (!this.content.author) {
            this.addError("Author is required.");
        }

        if (!this.content.nim) {
            this.addError("NIM is required.");
        }

        if (!this.content.university) {
            this.addError("University is required.");
        }

        if (!this.content.year) {
            this.addError("Year is required.");
        }

        return super.validate();
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

/**
 * OriginalityBlock.js
 * Originality Statement Block
 * Version: 1.0.0
 */

import Block from "../core/Block.js";

export default class OriginalityBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "originality",
            title: "Originality Statement",
            category: "frontmatter",
            order: options.order ?? 4,
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

            institutionId: institution.id,
            institutionName: institution.name,

            statement: "",

            declarationDate: "",

            signer: metadata.author,

            signature: null,

            place: metadata.city
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

        if (!this.content.statement) {
            this.addWarning("Originality statement is empty.");
        }

        return super.validate();
    }

    setStatement(statement) {
        this.content.statement = statement;
        return this;
    }

    setDeclarationDate(date) {
        this.content.declarationDate = date;
        return this;
    }

    setSigner(name) {
        this.content.signer = name;
        return this;
    }

    setSignature(signature) {
        this.content.signature = signature;
        return this;
    }

    setPlace(place) {
        this.content.place = place;
        return this;
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

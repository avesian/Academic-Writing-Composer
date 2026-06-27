/**
 * ApprovalBlock.js
 * Approval Sheet Block
 * Version: 1.0.0
 */

import Block from "../core/Block.js";

export default class ApprovalBlock extends Block {
    constructor(options = {}) {
        super({
            id: options.id,
            type: "approval",
            title: "Approval Sheet",
            category: "frontmatter",
            order: options.order ?? 2,
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

            supervisors: [],
            examiners: [],
            approver: null,

            approvalDate: "",
            documentNumber: ""
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

        if (!this.content.studyProgram) {
            this.addError("Study Program is required.");
        }

        if (!this.content.faculty) {
            this.addError("Faculty is required.");
        }

        if (!this.content.university) {
            this.addError("University is required.");
        }

        return super.validate();
    }

    addSupervisor(supervisor) {
        this.content.supervisors.push(supervisor);
        return this;
    }

    addExaminer(examiner) {
        this.content.examiners.push(examiner);
        return this;
    }

    setApprover(approver) {
        this.content.approver = approver;
        return this;
    }

    setApprovalDate(date) {
        this.content.approvalDate = date;
        return this;
    }

    setDocumentNumber(number) {
        this.content.documentNumber = number;
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

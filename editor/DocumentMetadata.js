/**
 * DocumentMetadata.js
 * Academic Writing Composer
 */

export default class DocumentMetadata {

    constructor(data = {}) {

        this.title = data.title || "Untitled Document";

        this.author = data.author || "";

        this.studentId = data.studentId || "";

        this.studyProgram = data.studyProgram || "";

        this.faculty = data.faculty || "";

        this.university = data.university || "";

        this.degree = data.degree || "";

        this.supervisor = data.supervisor || "";

        this.coSupervisor = data.coSupervisor || "";

        this.year = data.year || new Date().getFullYear();

        this.abstract = data.abstract || "";

        this.keywords = data.keywords || [];

        this.language = data.language || "id";

        this.createdAt = data.createdAt || new Date();

        this.updatedAt = data.updatedAt || new Date();

    }

    update(data = {}) {

        Object.assign(this, data);

        this.updatedAt = new Date();

        return this;

    }

    setTitle(title) {

        this.title = title;

        this.updatedAt = new Date();

        return this;

    }

    setAuthor(author) {

        this.author = author;

        this.updatedAt = new Date();

        return this;

    }

    addKeyword(keyword) {

        if (!this.keywords.includes(keyword)) {

            this.keywords.push(keyword);

            this.updatedAt = new Date();

        }

        return this;

    }

    removeKeyword(keyword) {

        this.keywords = this.keywords.filter(

            item => item !== keyword

        );

        this.updatedAt = new Date();

        return this;

    }

    toJSON() {

        return {

            title: this.title,

            author: this.author,

            studentId: this.studentId,

            studyProgram: this.studyProgram,

            faculty: this.faculty,

            university: this.university,

            degree: this.degree,

            supervisor: this.supervisor,

            coSupervisor: this.coSupervisor,

            year: this.year,

            abstract: this.abstract,

            keywords: this.keywords,

            language: this.language,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

}

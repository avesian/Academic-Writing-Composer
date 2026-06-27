/**
 * AcademicDocument.js
 * Core Document Model
 * Version: 1.0.0
 */

export default class AcademicDocument {
    constructor() {
        this.id = this.generateId();
        this.version = "1.0.0";
        this.state = "NEW";
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.metadata = {
            title: "",
            subtitle: "",
            author: "",
            nim: "",
            studyProgram: "",
            faculty: "",
            university: "",
            degree: "",
            year: new Date().getFullYear(),
            city: "",
            language: "id"
        };

        this.institution = {
            id: "",
            name: "",
            template: ""
        };

        this.settings = {
            paperSize: "A4",
            orientation: "portrait",

            margin: {
                top: 3,
                right: 3,
                bottom: 3,
                left: 4
            },

            typography: {
                fontFamily: "Times New Roman",
                fontSize: 12,
                lineSpacing: 2,
                paragraphSpacing: 0
            }
        };

        this.blocks = [];

        this.assets = {
            logo: null,
            signatures: [],
            images: []
        };

        this.statistics = {
            pageCount: 0,
            wordCount: 0,
            figureCount: 0,
            tableCount: 0,
            referenceCount: 0
        };

        this.logs = [];
    }

    /* ======================================================
       Metadata
    ====================================================== */

    setMetadata(data = {}) {
        Object.assign(this.metadata, data);
        this.touch();
    }

    getMetadata() {
        return this.metadata;
    }

    /* ======================================================
       Institution
    ====================================================== */

    setInstitution(data = {}) {
        Object.assign(this.institution, data);
        this.touch();
    }

    getInstitution() {
        return this.institution;
    }

    /* ======================================================
       Settings
    ====================================================== */

    setSettings(data = {}) {
        this.settings = {
            ...this.settings,
            ...data
        };

        this.touch();
    }

    getSettings() {
        return this.settings;
    }

    /* ======================================================
       Blocks
    ====================================================== */

    addBlock(block) {
        this.blocks.push(block);
        this.sortBlocks();
        this.touch();
    }

    removeBlock(id) {
        this.blocks = this.blocks.filter(block => block.id !== id);
        this.touch();
    }

    getBlock(id) {
        return this.blocks.find(block => block.id === id);
    }

    getBlocks() {
        return this.blocks;
    }

    clearBlocks() {
        this.blocks = [];
        this.touch();
    }

    sortBlocks() {
        this.blocks.sort((a, b) => a.order - b.order);
    }

    /* ======================================================
       Statistics
    ====================================================== */

    updateStatistics(data = {}) {
        Object.assign(this.statistics, data);
        this.touch();
    }

    getStatistics() {
        return this.statistics;
    }

    /* ======================================================
       State
    ====================================================== */

    setState(state) {
        this.state = state;
        this.touch();
    }

    getState() {
        return this.state;
    }

    /* ======================================================
       Logs
    ====================================================== */

    addLog(level, message, source = "CORE") {
        this.logs.push({
            timestamp: new Date(),
            level,
            source,
            message
        });
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }

    /* ======================================================
       Helpers
    ====================================================== */

    touch() {
        this.updatedAt = new Date();
    }

    generateId() {
        return "DOC-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8);
    }

    /* ======================================================
       Serialization
    ====================================================== */

    toJSON() {
        return {
            id: this.id,
            version: this.version,
            state: this.state,

            metadata: this.metadata,
            institution: this.institution,
            settings: this.settings,

            blocks: this.blocks,

            assets: this.assets,
            statistics: this.statistics,
            logs: this.logs,

            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromJSON(data) {
        const document = new AcademicDocument();

        Object.assign(document, data);

        return document;
    }
}

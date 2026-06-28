/**
 * DocumentBuilder.js
 * Academic Document Builder
 * Version: 1.0.0
 */

export default class DocumentBuilder {
    constructor(document = null) {
        this.document = document;
        this.reset();
    }

    reset() {
        this.blocks = [];
        this.metadata = {};
        this.assets = {};
        this.template = null;
        this.state = "IDLE";

        return this;
    }

    setDocument(document) {
        this.document = document;
        return this;
    }

    setTemplate(template) {
        this.template = template;
        return this;
    }

    setMetadata(metadata = {}) {
        this.metadata = {
            ...this.metadata,
            ...metadata
        };

        return this;
    }

    setAssets(assets = {}) {
        this.assets = {
            ...this.assets,
            ...assets
        };

        return this;
    }

    addBlock(block) {
        this.blocks.push(block);
        return this;
    }

    addBlocks(blocks = []) {
        blocks.forEach(block => this.addBlock(block));
        return this;
    }

    removeBlock(id) {
        this.blocks = this.blocks.filter(block => block.id !== id);
        return this;
    }

    clearBlocks() {
        this.blocks = [];
        return this;
    }

    sortBlocks() {
        this.blocks.sort((a, b) => (a.order || 0) - (b.order || 0));
        return this;
    }

    initializeBlocks() {
        this.blocks.forEach(block => {
            if (typeof block.initialize === "function") {
                block.initialize(this.document);
            }
        });

        return this;
    }

    composeBlocks() {
        this.blocks.forEach(block => {
            if (!block.enabled) return;

            if (typeof block.compose === "function") {
                block.compose(this.document);
            }
        });

        return this;
    }

    validateBlocks() {
        const report = {
            valid: true,
            errors: [],
            warnings: []
        };

        this.blocks.forEach(block => {

            if (typeof block.validate !== "function") return;

            const result = block.validate();

            if (result?.errors?.length) {
                report.valid = false;
                report.errors.push(...result.errors);
            }

            if (result?.warnings?.length) {
                report.warnings.push(...result.warnings);
            }

        });

        return report;
    }

    build() {

        this.state = "BUILDING";

        this.sortBlocks();

        this.initializeBlocks();

        this.composeBlocks();

        const validation = this.validateBlocks();

        this.state = validation.valid
            ? "COMPLETED"
            : "INVALID";

        return {
            document: this.document,
            metadata: this.metadata,
            assets: this.assets,
            template: this.template,
            blocks: this.blocks,
            validation
        };
    }

    export() {
        return {
            metadata: this.metadata,
            assets: this.assets,
            template: this.template,
            blocks: this.blocks.map(block =>
                typeof block.export === "function"
                    ? block.export()
                    : block
            )
        };
    }

    toJSON() {
        return {
            state: this.state,
            metadata: this.metadata,
            assets: this.assets,
            template: this.template,
            totalBlocks: this.blocks.length
        };
    }
}

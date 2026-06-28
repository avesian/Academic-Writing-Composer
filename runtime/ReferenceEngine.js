```javascript
/**
 * ReferenceEngine.js
 * Automatic Reference Engine
 * Version: 1.0.0
 */

export default class ReferenceEngine {

    constructor(options = {}) {

        this.options = {
            style: "APA7",
            sort: "author",
            removeDuplicate: true,
            ...options
        };

        this.references = [];

    }

    generate(document) {

        this.references = [];

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            this.collectReferences(block);

        }

        if (this.options.removeDuplicate) {
            this.removeDuplicate();
        }

        this.sortReferences();

        this.updateReferenceBlock(document);

        return this.references;

    }

    collectReferences(block) {

        if (!block.content) return;

        if (!Array.isArray(block.content.citations)) return;

        block.content.citations.forEach(citation => {

            this.references.push({
                id: citation.id || crypto.randomUUID(),
                author: citation.author || "",
                year: citation.year || "",
                title: citation.title || "",
                source: citation.source || "",
                publisher: citation.publisher || "",
                doi: citation.doi || "",
                url: citation.url || ""
            });

        });

    }

    removeDuplicate() {

        const map = new Map();

        this.references.forEach(reference => {

            const key = [
                reference.author,
                reference.year,
                reference.title
            ].join("|");

            if (!map.has(key)) {
                map.set(key, reference);
            }

        });

        this.references = [...map.values()];

    }

    sortReferences() {

        switch (this.options.sort) {

            case "author":

                this.references.sort((a, b) =>
                    (a.author || "")
                        .localeCompare(b.author || "")
                );

                break;

            case "year":

                this.references.sort((a, b) =>
                    (a.year || "")
                        .localeCompare(b.year || "")
                );

                break;

            case "title":

                this.references.sort((a, b) =>
                    (a.title || "")
                        .localeCompare(b.title || "")
                );

                break;

        }

    }

    updateReferenceBlock(document) {

        const referenceBlock = document.getBlocks().find(
            block => block.type === "reference"
        );

        if (!referenceBlock) return;

        referenceBlock.content.references = [...this.references];
        referenceBlock.content.totalReferences = this.references.length;
        referenceBlock.content.style = this.options.style;
        referenceBlock.content.generatedAt = new Date();

    }

    add(reference) {

        this.references.push(reference);

        return this;

    }

    clear() {

        this.references = [];

        return this;

    }

    getReferences() {

        return this.references;

    }

    export() {

        return this.references;

    }

    toJSON() {

        return {
            options: this.options,
            totalReferences: this.references.length,
            references: this.references
        };

    }

}
```

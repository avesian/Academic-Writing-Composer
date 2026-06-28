```javascript
/**
 * TOCEngine.js
 * Table of Contents Engine
 * Version: 1.0.0
 */

export default class TOCEngine {

    constructor(options = {}) {

        this.options = {
            includeFrontMatter: true,
            includeBackMatter: true,
            maxLevel: 3,
            ...options
        };

        this.entries = [];

    }

    generate(document) {

        this.entries = [];

        const blocks = document.getBlocks();

        blocks.sort((a, b) => a.order - b.order);

        for (const block of blocks) {

            if (!block.enabled) continue;

            this.processBlock(block);

        }

        this.updateTOCBlock(document);

        return this.entries;

    }

    processBlock(block) {

        if (
            block.category === "frontmatter" &&
            !this.options.includeFrontMatter
        ) {
            return;
        }

        if (
            block.category === "backmatter" &&
            !this.options.includeBackMatter
        ) {
            return;
        }

        this.entries.push({
            id: block.id,
            title: block.title,
            type: block.type,
            level: 1,
            page: block.content?.page ?? null
        });

        if (
            block.type === "chapter" &&
            Array.isArray(block.content.sections)
        ) {

            block.content.sections.forEach(section => {

                this.entries.push({
                    id: section.id || crypto.randomUUID(),
                    title: section.title,
                    level: 2,
                    page: section.page || block.content.page || null
                });

                if (
                    Array.isArray(section.children) &&
                    this.options.maxLevel >= 3
                ) {

                    section.children.forEach(child => {

                        this.entries.push({
                            id: child.id || crypto.randomUUID(),
                            title: child.title,
                            level: 3,
                            page: child.page || block.content.page || null
                        });

                    });

                }

            });

        }

    }

    updateTOCBlock(document) {

        const toc = document.getBlocks().find(
            block => block.type === "toc"
        );

        if (!toc) return;

        toc.content.entries = [...this.entries];
        toc.content.totalEntries = this.entries.length;
        toc.content.generatedAt = new Date();

    }

    getEntries() {

        return this.entries;

    }

    clear() {

        this.entries = [];

        return this;

    }

    export() {

        return this.entries;

    }

    toJSON() {

        return {
            options: this.options,
            totalEntries: this.entries.length,
            entries: this.entries
        };

    }

}
```

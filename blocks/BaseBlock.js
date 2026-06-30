/**
 * BaseBlock.js
 * Base Class for all Blocks
 */

export default class BaseBlock {

    constructor(data = {}) {

        this.id = data.id || crypto.randomUUID();

        this.type = data.type || "block";

        this.content = data.content || "";

        this.enabled = data.enabled ?? true;

        this.order = data.order ?? 0;

        this.page = data.page ?? null;

        this.createdAt = data.createdAt || new Date();

        this.updatedAt = data.updatedAt || new Date();

    }

    setContent(content) {

        this.content = content;

        this.touch();

    }

    setPage(page) {

        this.page = page;

    }

    touch() {

        this.updatedAt = new Date();

    }

    render() {

        return this.content;

    }

    toJSON() {

        return {
            id: this.id,
            type: this.type,
            content: this.content,
            enabled: this.enabled,
            order: this.order,
            page: this.page,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };

    }

}



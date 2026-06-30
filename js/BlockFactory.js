/**
 * BlockFactory.js
 * Academic Writing Composer
 */

class ParagraphBlock {

    constructor(data = {}) {

        this.id =
            data.id ??
            crypto.randomUUID();

        this.type = "paragraph";

        this.content =
            data.content ?? "";

    }

    render() {

        return `<p>${this.content}</p>`;

    }

    toJSON() {

        return {

            id: this.id,

            type: this.type,

            content: this.content

        };

    }

}

export default class BlockFactory {

    constructor() {

        this.types = new Map();

        this.register(
            "paragraph",
            ParagraphBlock
        );

    }

    register(type, BlockClass) {

        this.types.set(type, BlockClass);

    }

    unregister(type) {

        this.types.delete(type);

    }

    has(type) {

        return this.types.has(type);

    }

    create(type, data = {}) {

        const BlockClass =
            this.types.get(type);

        if (!BlockClass) {

            throw new Error(
                `Unknown block type: ${type}`
            );

        }

        return new BlockClass(data);

    }

}


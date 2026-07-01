/**
 * BlockRegistry.js
 * Academic Writing Composer
 */

export default class BlockRegistry {

    constructor() {

        this.blocks = new Map();

    }

    register(block) {

        if (!block || !block.id) {
            throw new Error("Invalid block instance.");
        }

        this.blocks.set(block.id, block);

        return block;

    }

    unregister(id) {

        this.blocks.delete(id);

    }

    get(id) {

        return this.blocks.get(id) ?? null;

    }

    has(id) {

        return this.blocks.has(id);

    }

    all() {

        return [...this.blocks.values()];

    }

    clear() {

        this.blocks.clear();

    }

    count() {

        return this.blocks.size;

    }

}


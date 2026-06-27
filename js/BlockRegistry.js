/**
 * BlockRegistry.js
 * Block Registry
 * Version: 1.0.0
 */

export default class BlockRegistry {
    constructor() {
        this.blocks = new Map();
    }

    /**
     * Register Block Class
     */
    register(BlockClass) {
        const instance = new BlockClass();

        if (!instance.type) {
            throw new Error("Block must define a type.");
        }

        this.blocks.set(instance.type, BlockClass);

        return this;
    }

    /**
     * Unregister Block
     */
    unregister(type) {
        this.blocks.delete(type);
        return this;
    }

    /**
     * Create Block Instance
     */
    create(type, options = {}) {
        const BlockClass = this.blocks.get(type);

        if (!BlockClass) {
            throw new Error(`Block "${type}" is not registered.`);
        }

        return new BlockClass(options);
    }

    /**
     * Check Registration
     */
    has(type) {
        return this.blocks.has(type);
    }

    /**
     * Get Block Class
     */
    get(type) {
        return this.blocks.get(type) || null;
    }

    /**
     * Get All Registered Types
     */
    types() {
        return [...this.blocks.keys()];
    }

    /**
     * Get All Block Classes
     */
    all() {
        return [...this.blocks.values()];
    }

    /**
     * Count
     */
    count() {
        return this.blocks.size;
    }

    /**
     * Clear Registry
     */
    clear() {
        this.blocks.clear();
        return this;
    }
}

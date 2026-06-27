/**
 * EngineRegistry.js
 * Engine Registry
 * Version: 1.0.0
 */

export default class EngineRegistry {
    constructor() {
        this.engines = new Map();
    }

    /**
     * Register Engine
     */
    register(name, engine) {
        if (!name) {
            throw new Error("Engine name is required.");
        }

        this.engines.set(name, engine);

        return this;
    }

    /**
     * Unregister Engine
     */
    unregister(name) {
        this.engines.delete(name);

        return this;
    }

    /**
     * Get Engine
     */
    get(name) {
        return this.engines.get(name) || null;
    }

    /**
     * Check Engine
     */
    has(name) {
        return this.engines.has(name);
    }

    /**
     * Execute Engine
     */
    execute(name, ...args) {
        const engine = this.get(name);

        if (!engine) {
            throw new Error(`Engine "${name}" is not registered.`);
        }

        if (typeof engine.execute !== "function") {
            throw new Error(`Engine "${name}" has no execute() method.`);
        }

        return engine.execute(...args);
    }

    /**
     * Get All Engines
     */
    all() {
        return [...this.engines.values()];
    }

    /**
     * Get Engine Names
     */
    names() {
        return [...this.engines.keys()];
    }

    /**
     * Count
     */
    count() {
        return this.engines.size;
    }

    /**
     * Clear Registry
     */
    clear() {
        this.engines.clear();

        return this;
    }

    /**
     * Export
     */
    toJSON() {
        return {
            count: this.count(),
            engines: this.names()
        };
    }
}
